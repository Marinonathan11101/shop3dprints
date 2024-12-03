import Nav from "../routes/nav/nav.component";
import Footer from "./footer";
import { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useNavigate } from 'react-router-dom';

const ReviewPage = () => {
  const selectRef = useRef(null); // Create a ref for the select element
  const [reviewMessage, setReviewMessage] = useState("");
  const [image, setImage] = useState(null);
  const [stars, setStars] = useState(1); // Default to 1 star to avoid null
  const [user, setUser] = useState(null);
  const [productName, setProductName] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file (image) selected by the user
    if (file) {
      if (file.type.startsWith("image/")) {
        setImage(file); // Store the file object
      } else {
        alert("Error uploading image");
      }
    }
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch('https://shop3dprints.onrender.com/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    return data.filePath; // Assume the server returns the uploaded file's path
  };

  const decreaseValue = () => {
    if (stars > 1) {  // Only decrease if it's greater than the min
      setStars(stars - 1);
    }
  };

  const increaseValue = () => {
    if (stars < 5) {  // Only increase if it's less than the max
      setStars(stars + 1);
    }
  };

  const HandleReviewPageSubmit = async (e) => {
    e.preventDefault();

    let uploadedImagePath = null;
    if (image) {
      uploadedImagePath = await handleFileUpload(image); // Upload the image and get its path
    }

    if (uploadedImagePath === null){
      uploadedImagePath = "";
    }


    const reviewInfo = { user, reviewMessage, image: uploadedImagePath, stars, productName }; // Pass all this info to the backend

    console.log(reviewMessage, productName, uploadedImagePath, stars);

    try {
      const response = await fetch('https://shop3dprints.onrender.com/review/postReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewInfo), // Send email and password to backend
      });
      
      const data = await response.json();

      if (response.ok) {
        navigate("/");
        alert("Added review");

        // You can redirect the user to another page or update the UI state
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }

  }

  const getUserFromDataBase = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new Error("Auth token is missing");
      }

      const decodedToken = jwtDecode(authToken); // Decode the token
      const userId = decodedToken.userId;

      console.log(userId); // You can log it here after decoding the token

      const response = await fetch(
        `https://shop3dprints.onrender.com/api/users/id/${userId}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        console.log("Response fine");
        return data;
      } else {
        console.error("Failed to fetch user by id");
      }
    } catch (error) {
      console.error("Error:", error); // Catch any error during the process (token decoding, fetching data, etc.)
    }
  };

  const clearDuplication = (userHistory) => {
    // Use reduce to accumulate only unique items
    const uniqueHistory = userHistory.reduce((acc, curr) => {
      // Check if an item with the same _id and name already exists in the accumulator
      const exists = acc.some(item => item._id === curr._id && item.name === curr.name);
      if (!exists) {
        acc.push(curr); // Add the item if it's unique
      }
      return acc;
    }, []);
    return uniqueHistory;
  };

  const GenerateOptions = (userHistory, select) => {
    if (select) {
      select.innerHTML = ""; // Clear any existing options
    }

    if (userHistory.length === 0) {
      console.log("The object is empty");
    } else {
      userHistory = clearDuplication(userHistory);

      for (let i = 0; i < userHistory.length; i++) {
        const option = document.createElement("option");
        option.value = userHistory[i].name;
        option.textContent = userHistory[i].name;
        select.appendChild(option);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("useEffect called");

      const userData = await getUserFromDataBase();
      setProductName(userData.history[0].name);
      if (userData && userData.history && selectRef.current) {
        GenerateOptions(userData.history, selectRef.current); // Pass selectRef.current to GenerateOptions
      }
    };
    fetchData(); // Call the async function to fetch data and generate options
  }, []);

  return (
    <div className="PageContainer">
      <div className="ReviewPageContainer">
        <Nav />
        <div className="reviewFormContainer">
          <form
            onSubmit={(HandleReviewPageSubmit)}
          >
            <label htmlFor="dropdown">Choose an option:</label>
            <select id="dropdown" ref={selectRef} onChange={(e) => setProductName(e.target.value)}></select>

            <textarea
              id="reviewMessage"
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)} // Update review state
              rows="5"
              placeholder="Write your review here..."
              required
            />

            <label htmlFor="imageUpload">Upload an Image (optional):</label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*" // Allow only images to be selected
              onChange={handleImageChange}
            />

            <label htmlFor="stars">Choose how many stars</label>
            <button type="button" onClick={decreaseValue}>-</button>
            <input
              type="number"
              id="stars"
              value={stars}
              required
              onChange={(e) => {
                let value = e.target.value;

                // Ensure the value is within the min and max range
                if (value >= 1 && value <= 5) {
                  setStars(value); // Update the state if the value is valid
                }
              }}
              min={1}
              max={5}
            />
            <button type="button" onClick={increaseValue}>+</button>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReviewPage;