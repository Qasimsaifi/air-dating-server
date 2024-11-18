const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { register, login } = require("../controllers/authController");
const {
  getUser,
  getUserProfileById,
  updateUser,
  deleteUser,
  getFlightPreference,
  addFlightPreference,
  updateFlightPreference,
  deleteFlightPreference,
  getDatingMatches,
} = require("../controllers/userController");

// Auth
router.post("/register", register);
router.post("/login", login);

// User CRUD
router.get("/me", protect, getUser);
router.get("/profile/:id", getUserProfileById);
router.put("/me", protect, updateUser);
router.delete("/me", protect, deleteUser);

// Flight Preferences
router.get("/preferences", protect, getFlightPreference);
router.post("/preferences", protect, addFlightPreference);
router.put("/preferences", protect, updateFlightPreference);
router.delete("/preferences", protect, deleteFlightPreference);
router.get("/match", protect, getDatingMatches);
module.exports = router;
