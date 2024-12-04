import React from "react";

const Review = ({ review }) => {
    return (
        <div>
            <div className="review-item">
                <h3>{review.user.displayName}</h3>
                
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
                  <img src={review.image} />
                </div>

                <div className="reviewMessage">
                    <p>{review.reviewMessage}</p>
                </div>

             


            </div>
        </div >
    )
}

export default Review;