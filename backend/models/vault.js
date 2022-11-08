const { ObjectId } = require("mongodb");
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
    tags: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag",
        }]
    },
    sites: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Site"
        }]
    },
});

module.exports = mongoose.model("Vault", vaultSchema);
