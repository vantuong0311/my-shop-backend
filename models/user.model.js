const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            default: "",
        },

        avatar: {
            type: String,
            default: "",
        },

        address: {
            street: String,
            ward: String,
            district: String,
            city: String,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        otpCode: {
            type: String,
        },

        otpExpires: {
            type: Date,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);