const mongoose = require("mongoose");
require("dotenv").config();

// Define the MongoDB connection URL
// const mongoURL = process.env.MONGODB_URL; // Fallback URL
const mongoURL = process.env.MONGODB_URL_LOCAL; // Fallback URL

// Setup MongoDB connection
mongoose.connect(mongoURL, {
  // Deprecated options removed
});

// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Gracefully close the Mongoose connection when the application terminates
process.on("SIGINT", () => {
  db.close(() => {
    console.log("MongoDB connection closed due to application termination");
    process.exit(0);
  });
});

// Export the database connection
module.exports = db;
