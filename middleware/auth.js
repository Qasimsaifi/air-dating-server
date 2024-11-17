const jwt = require("jsonwebtoken"); // Import jsonwebtoken module
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token from header
      console.log("Token:", token); // Log token for debugging

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token

      console.log("Decoded JWT:", decoded); // Log decoded JWT to check contents

      // Attach user to the request object
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      console.error("Error:", error.message); // Log error message
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
