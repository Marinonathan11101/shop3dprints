import Nav from "../routes/nav/nav.component";
import Footer from "./footer";
import { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";

const getUserFromDataBase = async () => {
  const authToken = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(authToken); // Decode the token
  const userId = decodedToken.userId;

  console.log(userId);

  try {
    const response = await fetch(
      `https://shop3dprints.onrender.com/api/users/id/${userId}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("response fine");
      return data;
    } else {
      console.error("Failed to fetch user at the id");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const GenerateOptions = (userHistory, select) => {
  if (userHistory.length === 0) {
    console.log("The object is empty");
  } else {
    clearDuplication(userHistory);
    
    for (let i = 0; i < userHistory.length; i++) {
      const option = document.createElement("option");
      option.value = userHistory[i].name;
      option.textContent = userHistory[i].name;
      select.appendChild(option);
    }
  }
};

const ReviewPage = () => {
  const selectRef = useRef(null); // Create a ref for the select element

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserFromDataBase();
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
          <form>
            <label htmlFor="dropdown">Choose an option:</label>
            <select id="dropdown" ref={selectRef}></select>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReviewPage;