import Nav from "../routes/nav/nav.component";
import Footer from "./footer";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { addItem } from "../cart/cartHelper"

const ProductsPage = () => {
    const location = useLocation();
    const { product } = location.state;
    
    // State to manage the selected product image
    const [selectedProductImage, setSelectedProductImage] = useState(product.imageURL[0]);

    console.log(product.colors);
    // States for selected color and quantity
    const [selectedColor, setSelectedColor] = useState(product.colors.length > 0 ? product.colors[0] : "");

    // Function to update selected product image
    const changeSelectedImage = (image) => {
        console.log("Image clicked:", image); 
        setSelectedProductImage(image); // This will trigger a re-render
    }

    // Function to set selected color
    const determineWhatColor = (color) => {
        setSelectedColor(color);
    };

    return (
        <div>
            <div className="ProductsPageContainer">
                <Nav />

                <div className="MainContent">
                    <div className="ProductsPageImageContainer">
                        <img src={selectedProductImage} alt={product.name} />  {/* Image updated from state */}

                        <div className="otherImagesContainer">
                            {product.imageURL.map((image, index) => (
                                <div key={index} className="Otherimages" onClick={() => changeSelectedImage(image)}>
                                    <img src={image} alt={`Product thumbnail ${index}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="ProductInfoContainer">
                        <h2>{product.name}</h2>
                        <p>${product.price} CAD</p>
                        <h3>Description</h3>
                        <p>{product.description}</p>
                        <h3>Dimensions</h3>
                        <p>{product.dimensions}</p>

                        <div className="product-rating">
                            <div className="stars">
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                            </div>
                        </div>

                        {/* Color Selection Section */}
                        <div className="colorSection">
                            <p>Color: {selectedColor}</p>
                            <div className="color-container">
                                {product.colors.map((color, index) => (
                                    <span
                                        key={index}
                                        className="color-circle"
                                        style={{ backgroundColor: color.toLowerCase() }}
                                        onClick={() => determineWhatColor(color)}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="AddToCartButtonContainer">
                            <button onClick={() => addItem(product, selectedColor, () => console.log("item added to cart"))}>ADD TO CART</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductsPage;