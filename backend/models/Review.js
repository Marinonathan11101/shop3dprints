const mongoose = require('mongoose');
import User from './User';

const reviewSchema = new mongoose.Schema({

    user: {
        type: User,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    image: {
        type: File,

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
