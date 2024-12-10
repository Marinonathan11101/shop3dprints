import '../../App.css';
import Nav from "../nav/nav.component";
import Footer from '../../components/footer';
import React, { useState, useEffect, useRef } from 'react';
import Product from '../../components/product.jsx';  // Import Product component
import { Navigate, useLocation } from 'react-router-dom';
import Image from "../../images/3DPrinter.png"
import { useNavigate } from 'react-router-dom';
import ProductsPage from "../../components/productsPage.jsx"
import { AddLike } from '../../components/likesHelper.jsx';
import OurColors from "../../images/ourColors.png"
import Review from '../../components/review.jsx';
import logo from "../../images/logo.png"


function Home({ isAdmin }) {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const productsSectionRef = useRef(null);

    const filteredProducts = location.state?.filteredProducts || [];
    const filteredProductsByName = location.state?.filteredProductsByName || [];

    const scrollToProducts = () => {
        productsSectionRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    // Fetch all products when the component is mounted
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://shop3dprints.onrender.com/products');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);  // Store the fetched products in the state
                    console.log(data);
                } else {
                    console.error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);  // Stop loading once the fetch is complete
            }
        };


        const fetchReviews = async () => {
            try {
                const response = await fetch('https://shop3dprints.onrender.com/review/reviews');
                if (response.ok) {
                    const data = await response.json();
                    setReviews(data);
                    console.log(data);
                } else {
                    console.error('Failed to fetch Reviews');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        fetchReviews();

    }, []);  // Empty dependency array ensures it runs only once

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        console.log(id);

        if (!confirmDelete) {
            return; // Exit if the user cancels
        }

        try {
            const response = await fetch(`https://shop3dprints.onrender.com/products/${id}/delete`, {
                method: 'DELETE', // Specify the DELETE method
            });

            if (response.ok) {
                alert('Product deleted successfully!');

                // Update the state to remove the deleted product from the list
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product._id !== id)
                );
            } else {
                console.error('Failed to delete product');
                alert('Error deleting product. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting product. Please check your connection.');
        }
    };

    const handleLikes = async (id) => {
        try {
            const response = await fetch(`https://shop3dprints.onrender.com/products/${id}`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                alert("Product added to likes. View at the top.")
                console.log(data);
                AddLike(data);

            } else {
                console.error('Failed to fetch product at the id');

            }
        } catch (error) {
            console.error('Error:', error);

        }
    };

    // Default to all products if no filtered products are available
    const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : products;

    return (
        <div className='homeBody'>
            <Nav scrollToProducts={scrollToProducts} />

            <div className="sideMenuWrapper">
                <div className="sideMenu">
                    <div className="sideMenuContent">
                        <div className='divCoasters'>
                            <h3>Coasters</h3>
                            <ul>
                                <li><a href="#">Marvel</a></li>
                                <li><a href="#">DC</a></li>
                                <li><a href="#">Sports</a></li>
                                <li><a href="#">Cars</a></li>
                                <li><a href="#">Food</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3>Keychains</h3>
                            <ul>
                                <li><a href="#">Marvel</a></li>
                                <li><a href="#">DC</a></li>
                                <li><a href="#">Sports</a></li>
                                <li><a href="#">Cars</a></li>
                                <li><a href="#">Food</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className='OurService'>
                <div className='OurServiceImage'>

                </div>
                <div className='OurServiceText'>
                    <h2>MATTEO'S 3D PRINTING ONLINE STORE</h2>
                    <p>Ever since 2022, Shop 3D Prints is a Canadian 3D printing business conducted by Matteo Sforza where you could buy desired 3D prints!</p>
                    <button onClick={scrollToProducts}>VIEW PRODUCTS</button>
                </div>


            </div>

            <section className='Info'>

                <div className='InfoContainer'>
                    <div className='OurColors'>
                        <h2>About Us</h2>
                        <img src={logo} alt="" />
                    </div>

                    <div className='Custom'>
                        <h2>We Sell Custom Prints</h2>
                        <img src="https://st2.depositphotos.com/2274151/7117/v/450/depositphotos_71174187-stock-illustration-custom-made-grunge-retro-blue.jpg" alt="" />
                    </div>

                    <div className='FromCanada'>
                        <h2>From Canada!</h2>
                        <img src="https://cdn.vectorstock.com/i/500p/38/04/canadian-flag-symbols-maple-leaf-decorative-icon-vector-39773804.jpg" alt="" />
                    </div>

                </div>

            </section>


            <section ref={productsSectionRef} className="AllProducts">
                <h2>ALL PRODUCTS</h2>

                <div className="productsContainer">
                    {loading ? (
                        <p>Loading products...</p>
                    ) : filteredProductsByName.length > 0 ? (
                        filteredProductsByName.map((product) => (
                            <div
                                key={product._id}
                                className="productItem"
                                onClick={() => navigate("/products", { state: { product } })}
                            >
                                <Product product={product} /> {/* Render the Product component */}
                                {isAdmin && (
                                    <div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering the parent click event
                                                navigate(`/edit-product/${product._id}`);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering the parent click event
                                                handleDelete(product._id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleLikes(product._id);
                                    }}

                                    className="LikeButton">LIKE?</button>
                            </div>
                        ))
                    ) : (
                        productsToDisplay.map((product) => (
                            <div
                                key={product._id}
                                className="productItem"
                                onClick={() => navigate("/products", { state: { product } })}
                            >
                                <Product product={product} /> {/* Render the Product component */}
                                {isAdmin && (
                                    <div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering the parent click event
                                                navigate(`/edit-product/${product._id}`);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering the parent click event
                                                handleDelete(product._id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleLikes(product._id);
                                    }}

                                    className="LikeButton">LIKE?</button>
                            </div>
                        ))
                    )}
                </div>
            </section>


            <section className="ReviewsSection">
                <h2>REVIEWS</h2>

                <div className="Reviews">
                    {reviews.map((review) => (
                        <Review key={review._id} review={review} />
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Home;
