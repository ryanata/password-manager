const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Tag = require("./tag");

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tags: {
        type: [Tag],
    }
});

module.exports = mongoose.model("Account", accountSchema);