const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    emailVerified: {
        type: Boolean,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    twoFactorAuthEnabled: {
        type: Boolean,
        required: true,
    },
    vaults: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vault",
        }]
    }
});

module.exports = mongoose.model("User", userSchema);