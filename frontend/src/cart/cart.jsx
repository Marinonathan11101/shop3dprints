import React, { useState, useEffect } from "react";
import Nav from "../routes/nav/nav.component";
import { getCart, updateItem, DeleteCartItem } from "./cartHelper"; // Import the helper function
import Footer from "../components/footer";
import { isAuthenticated } from "../utils/auth";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ClearCart } from "./cartHelper";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false); // Add state for tracking process
  const navigate = useNavigate();

  const maxQuantity = 10; // Define the max quantity

  useEffect(() => {
    const cartItems = getCart(); // Fetch cart items from localStorage
    setItems(cartItems);
  }, []);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * (item.count || 1), 0).toFixed(2);
  };

  const handleChange = (productId, color) => (event) => {
    const value = Math.max(1, Math.min(maxQuantity, Number(event.target.value))); // Clamp value between 1 and maxQuantity
    const updatedItems = items.map((item) =>
      item._id === productId && item.color === color // Check both productId and color
        ? { ...item, count: value }
        : item
    );
    setItems(updatedItems); // Update state with the new quantity
    updateItem(productId, value, color); // Persist the change in storage (adjust this function to handle color)
  };

  const HandleCheckOut = async (items) => {
    const usersName = localStorage.getItem("userName");

    if (!usersName) {
      alert("User not logged in!");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    setIsProcessing(true); // Set processing to true when checkout starts

    try {
      const response = await fetch(`http://localhost:5000/api/users/${usersName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization token if needed
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("User Data:", userData.email);

        // Send the user data and items to the backend to trigger the email
        const emailResponse = await fetch('http://localhost:5000/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: userData,
            items: items
          })
        });

        if (emailResponse.ok) {
          alert("Order confirmation email sent! See email for details");
          ClearCart();
          navigate("/");

        } else {
          alert("Failed to send email.");
        }

      } else {
        console.error("Failed to fetch user data:", response.statusText);
        alert("Failed to retrieve user details.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Server error occurred.");
    } finally {
      setIsProcessing(false); // Set processing to false when checkout ends
    }
  };

  return (
    <div className="PageContainer">
      <Nav />

      <div className="CartPage">
        <h2>REVIEW YOUR ORDER</h2>
        <div className="GridContainer">
          <div className="itemsGrid">
            <h2>ITEMS</h2>
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  <img src={item.imageURL} alt="" /> {item.name} - Quantity: {item.count || 1} - Color: {item.color} - Price: ${item.price * item.count}
                  <div className="quantity-section">
                    <p>Quantity:</p>
                    <span>Adjust quantity</span>
                    <input
                      type="number"
                      value={item.count || 1}
                      onChange={handleChange(item._id, item.color)}
                    />
                  </div>
                  <button onClick={() => DeleteCartItem(item._id, item.color)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="Summary">
            <h2>Summary</h2>
            <p>TOTAL: ${calculateTotal()}</p>
            <p>Estimated GST/HST:</p>
            {isAuthenticated() ? (
              <div className="buttonContainer">
                <button onClick={() => HandleCheckOut(items)} disabled={isProcessing}>CHECKOUT</button>
              </div>
            ) : (
              <div className="SignInButtonContainer">
                <Link to={"/signIn"}>
                  <button>SIGN IN TO CHECKOUT</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart
