const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const User = require("./models/User"); // Replace with your actual User model file path

// MongoDB connection URI
const DB_URI =
  "mongodb+srv://vercel-admin-user:root@cluster0.honqvwn.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your DB URI

// Connect to MongoDB
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  try {
    // Read JSON data
    const dataPath = path.join(__dirname, "index.json"); // Replace with actual JSON file path
    const users = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    // Insert users into the database
    await User.insertMany(users);
    console.log("Dummy user entries added successfully.");

    // Close the database connection
    db.close();
  } catch (error) {
    console.error("Error adding dummy user entries:", error);
    db.close();
  }
});
