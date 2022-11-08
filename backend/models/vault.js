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
            name: {
                type: String,
                required: true,
            },
            colorHEX: {
                type: String,
                required: true,
            }
        }]
    },
    sites: {
        type: [{
            name: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
            accounts: {
                type: [{
                    username: {
                        type: String,
                        required: true,
                    },
                    password: {
                        type: String,
                        required: true,
                    },
                    tags: {
                        type: [String],
                    }
                }],
            },
        }]
    },
});

module.exports = mongoose.model("Vault", vaultSchema);
