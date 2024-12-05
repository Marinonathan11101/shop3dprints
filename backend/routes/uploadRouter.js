const express = require('express');
const multer = require('multer');
const path = require('path');
const bucket = require('./gcs'); // Import your Google Cloud Storage bucket configuration

const router = express.Router();

const storage = multer.memoryStorage(); // Store files in memory temporarily
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true); // Accept only image files
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
});

router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded!' });
        }

        const fileName = `${Date.now()}-${path.extname(req.file.originalname)}`;
        const file = bucket.file(fileName);

        // Upload the file to the bucket
        await file.save(req.file.buffer, {
            metadata: { contentType: req.file.mimetype },
        });

        // Make the file publicly accessible
        await file.makePublic();

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
        res.status(200).json({ image: publicUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Failed to upload file' });
    }
});

module.exports = router;