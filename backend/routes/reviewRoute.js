const express = require('express');
const Review = require('../models/Product'); 

const router = express.Router();




router.post("/postReview", async (req, res) =>{
    const {user, message, image, stars, productName} = req.body;

    try {
        const newReview = new Review({
          user,
          message,
          image,
          stars,
          productName
        });

        await newReview.save();

        res.status(201).json({
            message: 'Review added successfully',
            review: newReview
        });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({
            error: 'Failed to add review'
        });
    }
});