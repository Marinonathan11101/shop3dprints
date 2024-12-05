
const express = require('express'); // Express: A web application framework for setting up routes and handling HTTP requests.
const mongoose = require('mongoose'); // Mongoose: An ODM (Object Data Modeling) library for MongoDB, allowing you to define schemas and models for data
const cors = require('cors'); // A middleware for handling Cross-Origin Resource Sharing, enabling the server to accept requests from different origins (e.g., from a frontend app on another port).
const authRoutes = require('./routes/auth'); // Import the auth routes\
const adminRoutes = require('./routes/adminRoutes')
const productRoutes = require("./routes/productRoutes")
const emailRoute = require("./routes/email");
const reviewRoute = require("./routes/reviewRoute");
const uploadRouter = require('./routes/uploadRouter'); 
const path = require('path');

const app = express(); // app is an instance of the Express server.
app.use(express.json()); // app.use(express.json()) allows the server to parse incoming JSON data.

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', "https://shop3dprints.onrender.com", 'https://shop3dprints.vercel.app', "https://shop3dprints-43249.web.app"];  // Add all your frontend origins here
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {  // !origin allows no-origin requests (for testing)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add methods if needed
    allowedHeaders: ['Content-Type', 'Authorization']  // Customize headers as needed
};

app.use(cors(corsOptions));
 // app.use(cors()) enables the server to accept cross-origin requests, allowing the frontend (often on a different port) to interact with this server.

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DATABASE}.oqgf4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


  // middleWare
  
app.use('/admin', adminRoutes);

app.use('/products', productRoutes);

app.use("/api", emailRoute);

app.use("/review", reviewRoute);

app.use('/upload', uploadRouter);

app.use("/api", authRoutes); // Middleware: app.use() is a method in Express used to register middleware. Middleware is any function that runs when a request is received, and it can modify the request, respond to it, or pass it along to the next middleware or route handler.
// This means that any route defined in authRoutes will be "mounted" under "/api"

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'routes', 'uploads')));

app.listen(5000, () => {
    console.log('Server running on port 5000');
});