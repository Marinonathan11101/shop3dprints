import React from "react";

const Review = ({ review }) => {
    console.log(review.user?.displayName || "Anonymous");
    console.log(review.image);

    return (
        <div className="review-item">
            <h3>{review.user?.displayName || "Anonymous"}</h3>

            <div className="review-productName">
                <p>{review.productName}</p>
            </div>

            <div className="review-rating">
                <div className="stars">
                    <span className="star">&#9733;</span>
                    <p>{review.stars} / 5</p>
                </div>
            </div>

            <div className="reviewImage">
                <img src={review.image} alt="Review" />
            </div>

            <div className="reviewMessage">
                <p>{review.reviewMessage}</p>
            </div>
        </div>
    );
};

export default Review;