

const express = require('express'); //express: This is the Express framework, which simplifies creating a web server in Node.js. It is used here to create an HTTP server and define routes (URL endpoints) for handling requests.
const bcrypt = require('bcryptjs'); // This is a library for hashing passwords in a secure way. We will use it to hash the user's password before storing it in the database. Hashing helps protect user passwords from being stored in plaintext.
const User = require('../models/User'); // This imports the User model that you defined using Mongoose. The User model represents a user in your MongoDB database and defines how user data should be structured.
const router = express.Router(); // This is an instance of express.Router() used to define routes for handling specific HTTP requests (like POST, GET, etc.) in a modular way. It's later exported and used in your main server file to handle incoming requests.
const jwt = require('jsonwebtoken');


router.post("/signup", async (req, res) => { 
    
    // This defines a POST route at the /signup URL endpoint. POST is used because we are sending data (in this case, the user’s sign-up details) to the server.
    // async (req, res) => { ... }: This is an asynchronous function that handles the POST request. The async keyword allows us to use await inside the function, making it easier to work with promises (like database queries).
    
    // const { displayName, email, password } = req.body;: This line destructures the request body (req.body) to extract the displayName, email, and password sent from the client-side form. These values are necessary to create a new user.
    // The req object represents the HTTP request that the client (e.g., your frontend application) makes to the server. It contains information about what the client is asking for

    // The res object is what the server uses to send back data to the client. You can think of it as the server’s way of "responding" to the client's request with some data or a message. Common methods of res include:
    const { displayName, email, password, shippingAddress, postalCode, country, city, isAdmin } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists!"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // await bcrypt.hash(password, 10): This line uses bcrypt to hash the password before saving it in the database. The second parameter (10) specifies the salt rounds, which determine the computational cost of the hashing algorithm (the higher the number, the more secure but slower it becomes).

        const newUser = new User({
            displayName,
            email,
            password: hashedPassword,
            shippingAddress,
            postalCode,
            country,
            city,
            isAdmin: isAdmin || false // If `isAdmin` is not provided, default to false
        });

        await newUser.save(); // await newUser.save(): This saves the new user to the MongoDB database. The await keyword ensures that the code waits for the save operation to complete before moving on.

        res.status(201).json({message: "User created successfully"});

    } catch (err) {
        console.error("Fetch error:", err);
        res.status(500).json({message: "Server error"});
    }
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({ email}); // checks if the user with the provided email exists.
 
        if (!user)
        {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Compare entered password with the hashed password in the DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" }); // If passwords don't match
        }

        const token = jwt.sign( // generates a JWT (JSON Web Token) to send back to the client for authentication.
            { userId: user._id, isAdmin: user.isAdmin},  // Payload: user ID
            process.env.JWT_SECRET, // Secret key (stored in .env)
            { expiresIn: '1h' } // Token expiration time (optional)
        );

       res.json({
            success: true,
            token: token,
            displayName: user.displayName,  // Send the displayName to the frontend
            id: user._id
          });
        

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
       
    }



    
});


router.put('/users/:email', async (req, res) => {
    try {
      const { email } = req.params;
      const { history } = req.body;
  
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $set: { history } },
        { new: true } // Returns the updated document
      );
  
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });



router.get('/users/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const user = await User.findOne({ displayName: name }); // Find user by name

        if (!user) { // If no user
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user); // Send user data as JSON
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/users/id/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract user ID from request parameters
        console.log(id);
        const user = await User.findById(id); // Find user by ID

        if (!user) { // If user is not found
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user); // Send user data as JSON response
    } catch (error) {
        console.error("Error fetching user:", error); // Log server error for debugging
        res.status(500).json({ message: "Server error" }); // Send error response
    }
});

module.exports = router;


