const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Check if the uploads directory exists, if not, create it
const uploadDir = path.join(__dirname, 'uploads');
console.log('Uploads Directory:', uploadDir); // Log the path to debug
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
    console.log('Uploads directory created successfully!');
}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Specify the folder where files should be saved
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
        const imageUrl = `${req.protocol}://${req.get('host')}/routes/uploads/${path.basename(req.file.path)}`;
        res.status(200).json({ image: imageUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'File upload failed' });
    }
});
module.exports = router;