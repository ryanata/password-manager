const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Account = require("./account");

const siteSchema = new mongoose.Schema({
    // Name of the site is unique among all other sites in the array. 
    // Can't enforce this in the schema, but can enforce it in the controller.
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    accounts: {
        type: [Account],
    },
});

module.exports = mongoose.model("Site", siteSchema);