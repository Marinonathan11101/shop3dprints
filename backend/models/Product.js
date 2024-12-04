const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    imageURL: {
        type: [String],
        required: true
    },

    category: {
        type: String,
        required: true,
        enum: ['coaster', 'keychain', 'other'],
    },

    media: {
        type: String,
        required: true,
        enum: ['Marvel', "DC", "Sports", "Cars", "Food", "Pokemon", "Other"]
    },

    colors: {
        type: [String],
        enum: ["Red", "Blue", "Black", "White", "Orange", "Yellow", "Green", "Brown", "Gold", "Silver", "Grey", "Other"]

    },

    dimensions:{
        type: String,
        required:true
    }

    

});


const Product = mongoose.model('Product', productSchema); // This line creates a Mongoose model named User based on the userSchema. A model in Mongoose provides an interface to interact with the MongoDB collection (User collection in this case), including creating, reading, updating, and deleting documents.

module.exports = Product;
