const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the folder where files should be saved
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique file name with original extension
    }
});

// Initialize Multer
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Route to handle image upload
router.post('/', upload.single('image'), (req, res) => {
    try {
        const filePath = req.file.path; // The path where the file was saved
        res.status(200).json({ filePath }); // Respond with the file path
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'File upload failed' });
    }
});

module.exports = router;