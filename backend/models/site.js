const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account"
        }]
    },
});

module.exports = mongoose.model("Site", siteSchema);