require('dotenv').config(); // Load environment variables

const mongoose = require('mongoose');

const uri = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/task-manager-api'; // Use environment variable or default

if (!uri) {
  console.error("MONGODB_URL is not defined in .env file");
  process.exit(1);
}

mongoose.connect(uri, {
  useUnifiedTopology: true
})
