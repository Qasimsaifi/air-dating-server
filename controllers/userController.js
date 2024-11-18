const User = require("../models/User");

// CRUD Operations
exports.getUser = async (req, res) => {
  try {
    if (!req.user) return res.status(404).json({ message: "User not found" });
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Optionally exclude sensitive fields like password
    const { password, ...userProfile } = user.toObject();
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true, // Ensures validation rules in schema are enforced
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Flight Preferences
exports.getAllFlightPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.flightPreferences);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getFlightPreference = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const preference = user.flightPreferences[0];
    if (!preference)
      return res.status(404).json({ message: "No preference found" });
    res.json(preference);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addFlightPreference = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.flightPreferences = [req.body];
    await user.save();
    res
      .status(201)
      .json({ message: "Preference added successfully", preference: req.body });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateFlightPreference = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.flightPreferences.length === 0)
      return res.status(404).json({ message: "No preference found to update" });

    user.flightPreferences[0] = req.body;
    await user.save();
    res.json({
      message: "Preference updated successfully",
      preference: req.body,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFlightPreference = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.flightPreferences = [];
    await user.save();
    res.json({ message: "Preference deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getDatingMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { pnr, class: userClass } = user.flightPreferences;

    // Find users with the same PNR and class, and different gender
    const matches = await User.find({
      "flightPreferences.pnr": pnr,
      "flightPreferences.class": userClass,
      gender: { $ne: user.gender },
      _id: { $ne: user._id }, // Exclude the current user
    });

    res.json({ matches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
