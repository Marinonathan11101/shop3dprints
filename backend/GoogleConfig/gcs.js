const { Storage } = require('@google-cloud/storage');

// Get the service account key from the environment variable
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

// Initialize the Storage client with the service account credentials
const storage = new Storage({
  credentials: serviceAccount,
  projectId: serviceAccount.project_id,
});

const bucketName = process.env.BUCKET_NAME; // Bucket name from the environment variable
const bucket = storage.bucket(bucketName);

module.exports = bucket;