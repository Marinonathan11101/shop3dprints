const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers to the User model
        required: true
    },

    reviewMessage: {
        type: String,
        required: true
    },

    image: {
        type: String,

    },

    stars: {
        type: Number,
        required: true

    },

    productName: {
        type: String,
        required: true
    }

});


const Review = mongoose.model('Review', reviewSchema); // This line creates a Mongoose model named User based on the userSchema. A model in Mongoose provides an interface to interact with the MongoDB collection (User collection in this case), including creating, reading, updating, and deleting documents.

module.exports = Review;
