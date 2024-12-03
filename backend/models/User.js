
const mongoose = require('mongoose'); // This line imports Mongoose, allowing you to interact with MongoDB databases using Mongoose's syntax and tools.

const userSchema = new mongoose.Schema({ 

    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    shippingAddress: {type: String, required: true},
    postalCode: {type: String, required: true},
    country: {type: String, required: true},
    city: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    history: {
        type: Array,
        default: []
    },
    reviews: {
        type:Array,
        default:[]
    }

    
},  { strict: true } );



const User = mongoose.model('User', userSchema); // This line creates a Mongoose model named User based on the userSchema. A model in Mongoose provides an interface to interact with the MongoDB collection (User collection in this case), including creating, reading, updating, and deleting documents.

module.exports = User;
