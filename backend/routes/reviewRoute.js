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


router.get("/reviews", async (req, res) => {
    try {
        const reviews = await Review.find()
        .populate('user', 'displayName');
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
})

module.exports = router;