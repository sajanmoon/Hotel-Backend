const mongoose = require("mongoose");

// Define the mongoDB connection URL
const mongoURL = "mongodb://127.0.0.1:27017/hotel";  // Use IPv4 address

// Setup mongoDB connection
mongoose.connect(mongoURL, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

// Export the database connection
module.exports = db;
