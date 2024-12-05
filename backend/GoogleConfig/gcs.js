const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Initialize the Storage client with your service account key
const storage = new Storage({
    keyFilename: path.join(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS), // Replace with the path to your service account JSON
    projectId: process.env.PROJECT_ID, // Replace with your Google Cloud project ID
});

const bucketName = process.env.BUCKET_NAME; // Replace with your bucket name
const bucket = storage.bucket(bucketName);

module.exports = bucket;