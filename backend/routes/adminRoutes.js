const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/verifyAdmin');

// Admin route protected by `verifyAdmin` middleware
router.get("/dashboard", verifyAdmin, (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard" });
});

module.exports = router;