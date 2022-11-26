const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Site = require("../models/site");

const vaultSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    masterPassword: {
        type: String,
        required: true,
    },
    mfa: {
        phone: {
            type: Number,
        },
    },
    sites: [Site],
});

module.exports = mongoose.model("Vault", vaultSchema);
