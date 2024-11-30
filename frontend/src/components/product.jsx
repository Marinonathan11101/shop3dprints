import React from "react";

const Product = ({ product }) => {
    return (
        <div>
            <div className="product-item">
                <h3>{product.name}</h3>

                <div className="product-rating">
                    <div className="stars">
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                    </div>
                </div>

                <img src={product.imageURL} alt={product.name} />


            </div>

            <div className="price">
                <p>${product.price} CAD</p>
            </div>
        </div >
    )
}

export default Product;