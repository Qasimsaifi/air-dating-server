// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const flightPreferenceSchema = new mongoose.Schema({
  pnr: { type: String, default: "" },
  flightNumber: { type: String, default: "" },
  class: {
    type: String,
    enum: ["economy", "business", "first"],
    default: "economy",
  },
  seatNumber: { type: String, default: "" },
});

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    phoneNumber: { type: String, trim: true },
    dateOfBirth: { type: Date },
    flightPreferences: [flightPreferenceSchema],
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
