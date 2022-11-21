const mongoose = require("mongoose");
const Account = require("./account");

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
        type: [Account]
    },
});

module.exports = mongoose.model("Site", siteSchema);