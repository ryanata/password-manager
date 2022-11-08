const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

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
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        }]
    }
});

module.exports = mongoose.model("Account", accountSchema);