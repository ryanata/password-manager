const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    colorHEX: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Tag", tagSchema);