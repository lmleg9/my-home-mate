const mongoose = require("./db");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    occupation: { type: String },
    preferences: {
        preferredProvince: { type: String },
        preferredMunicipality: { type: String },
        preferredAgeRange: [Number],
        preferredGender: { type: String, enum: ["Male", "Female", "Any"], default: "Any" },
        smoker: { type: Boolean, default: false },
        petFriendly: { type: Boolean, default: true },
        nightOwl: { type: Boolean, default: false },
        cleanliness: { type: Number, min: 1, max: 5 },
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
