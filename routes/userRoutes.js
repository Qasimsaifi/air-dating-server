const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { register, login } = require("../controllers/authController");
const {
  getUser,
  getUserProfileById,
  updateUser,
  deleteUser,
  getAllFlightPreferences,
  getFlightPreference,
  addFlightPreference,
  updateFlightPreference,
  deleteFlightPreference,
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
router.get("/preferences", protect, getAllFlightPreferences);
router.get("/preferences/:preferenceId", protect, getFlightPreference);
router.post("/preferences", protect, addFlightPreference);
router.put("/preferences/:preferenceId", protect, updateFlightPreference);
router.delete("/preferences/:preferenceId", protect, deleteFlightPreference);

module.exports = router;
