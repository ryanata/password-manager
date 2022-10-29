const mongoose = require("mongoose");

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
    accounts: {
        type: [{name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        // list of string tags
        tags: {
            type: [String],
        }}]
    },
});

module.exports = mongoose.model("Vault", vaultSchema);
