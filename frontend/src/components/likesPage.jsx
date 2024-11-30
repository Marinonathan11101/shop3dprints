import React, { useState, useEffect } from "react";
import Nav from '../routes/nav/nav.component';
import { GetLikes } from "./likesHelper";
import Footer from "./footer";
import { DeleteLike } from "./likesHelper";
import { useNavigate } from 'react-router-dom';





const LikesPage = () => {

  const [likes, setLikes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const likeItems = GetLikes(); // Fetch cart items from localStorage
    setLikes(likeItems);
  }, []);

  return (

    <div className="likesDiv" >
      <Nav />
      <div className="wishListContainer">


        <div className="likesContainer">
          <h2>YOUR WISHLIST</h2>
          <ul >
            {likes.map((item, index) => (
              <li key={index} onClick={() => navigate("/products", { state: {product: item} })}>
                <img src={item.imageURL} alt="" /> {item.name}
                <button className="likesButtonRemove" onClick={() => {DeleteLike(item._id)}}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer/>
    </div>

      )
   
}
      export default LikesPage