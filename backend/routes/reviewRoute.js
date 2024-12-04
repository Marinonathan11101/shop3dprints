const express = require('express');
const Review = require('../models/Review'); 

const router = express.Router();


router.post("/postReview", async (req, res) =>{
    const {user, reviewMessage, image, stars, productName} = req.body;

    try {
        const newReview = new Review({
          user,
          reviewMessage,
          image,
          stars,
          productName
        });

        await newReview.save();

        res.status(201).json({
            review: newReview
        });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({
            error: 'Failed to add review'
        });
    }
});

module.exports = router;