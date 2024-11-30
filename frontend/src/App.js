import logo from './images/logo.jpg';
import Home from './routes/home/home.component'
import Nav from "./routes/nav/nav.component"
import SignIn from "./routes/sign-in/signIn.component"
import {Routes, Route} from "react-router-dom";
import AddProducts from "./components/addProduct"
import React, { useState, useEffect } from 'react';
import EditProduct from './components/editProduct';
import {jwtDecode} from 'jwt-decode';
import ProductsPage from "./components/productsPage"
import Cart from "./cart/cart.jsx"
import LikesPage from "./components/likesPage.jsx"

import './App.css';

function App() {

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (token) {
          const decodedToken = jwtDecode(token);
          setIsAdmin(decodedToken.isAdmin);
      }
  }, []);

  return (

    
    <Routes>
      <Route path="/" element={<Home isAdmin={isAdmin}/>} />
      <Route path="/signIn" element={<SignIn/>}/>
      <Route path="/adminproducts" element={<AddProducts/>}/>
      <Route path="/edit-product/:id" element={<EditProduct />} /> {/* Add the route for editing */}
      <Route path="/products" element={<ProductsPage/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path='/likes' element={<LikesPage/>} />
    </Routes>
    
    
  );
}

export default App;