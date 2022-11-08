const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Vault = require('../models/vault');
const User = require('../models/user');
const Tag = require('../models/tag');
const Site = require('../models/site');
const Account = require('../models/account');

const asyncHandler = require('express-async-handler');

// @desc    Create new vault
// @route   POST /api/vault/
const createVault = asyncHandler(async (req, res) => {
    const { userID, vaultName, masterPassword, phoneNumber } = req.body;

    if (!userID || !vaultName || !masterPassword || !phoneNumber) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    // Check for user with this userID
    const userExists = await User.findOne({ userID });
    if (!userExists) {
        res.status(400);
        throw new Error('User does not exist');
    }

    // // Hash password
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password, salt)

    const vault = await Vault.create({
        name: vaultName,
        masterPassword: masterPassword,
        mfa:  {
            phone: phoneNumber
        },
    });

    if (vault) {
        const user = await User.findOneAndUpdate(
            { _id: userID }, 
            { $push: { 
                vaults: vault
            } 
        });

        if (!user) {
            res.status(400);
            throw new Error('Vault could not be added to user');
        }

        res.status(201).json({
            message: 'Vault created!',
            vault: {
                name: vault.name,
                masterPassword: vault.masterPassword,
                mfa: vault.mfa,
                userID: vault.userID
            },
        });
    } else {
        res.status(400);
        throw new Error('Vault was not created');
    }
});

// @desc    Gets all vaults
// @route   GET /api/vault/
const getVaults = asyncHandler(async (req, res) => {
    const { userID } = req.body;

    if (!userID) {
        res.status(400);
        throw new Error('Please enter the user ID');
    }

    // Check for user with this userID
    const userExists = await User.findOne({ userID });
    if (!userExists) {
        res.status(400);
        throw new Error('User does not exist');
    }

    const vaults = await userExists.populate({path: 'vaults'});

    if (vaults) {
        res.status(200).json({
            vaults: vaults["vaults"]
        });
    } else {
        res.status(400);
        throw new Error('Could not get the vaults');
    }
});

// @desc    Update vault
// @route   PUT /api/vault/{vaultID}
// can be used to update name, masterPassword, or phone
const updateVault = asyncHandler(async (req, res) => {
    const vaultID = req.params.vaultID;
    const { name, masterPassword, phone } = req.body;
    let update = {}

    const vaultExists = await Vault.findById(vaultID);

    if (!vaultExists) {
        res.status(400);
        throw new Error('This vault does not exist');
    }

    if (!name && !masterPassword && !phone) {
        res.status(400);
        throw new Error('Please enter a field to update');
    }

    // gather all the fields in which we want to update
    if (name) {
        update["name"] = name;
    }

    if (masterPassword) {
        update["masterPassword"] = masterPassword;
    }

    if (phone) {
        update["mfa.phone"] = phone;
    }

    const vault = await Vault.findByIdAndUpdate(vaultID, update, {new: true});

    if (vault) {
        res.status(200);
        res.send(vault);
    }
    else {
        res.status(400);
        throw new Error('Vault could not be updated');
    }
});

// @desc    Create tag
// @route   POST /api/vault/{vaultID}/tag
const createTag = asyncHandler(async (req, res) => {
    const vaultID = req.params.vaultID;
    const { name, colorHEX } = req.body;

    const vaultExists = await Vault.findById(vaultID);

    if (!vaultExists) {
        res.status(400);
        throw new Error('This vault does not exist');
    }

    if (!name || !colorHEX) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    const tag = await Tag.create({
        name: name,
        colorHEX: colorHEX
    });

    if (!tag) {
        res.status(400);
        throw new Error('Could not create the tag');
    }

    const vault = await Vault.findOneAndUpdate(
        { _id: vaultID }, 
        { $push: { 
            tags: tag
        }
    }, {new: true});

    if (vault) {
        res.status(200);
        res.send(vault);
    }
    else {
        res.status(400);
        throw new Error('Tag could not be updated');
    }
});

// @desc    Update tag
// @route   PUT /api/vault/{vaultID}/tag/{tagID}
const updateTag = asyncHandler(async (req, res) => {
    const vaultID = req.params.vaultID;
    const tagID = req.params.tagID;
    const { name, colorHEX } = req.body;
    let update = {}

    const vaultExists = await Vault.findById(vaultID);

    if (!vaultExists) {
        res.status(400);
        throw new Error('This vault does not exist');
    }

    const tagExists = await Tag.findById(tagID);

    if (!tagExists) {
        res.status(400);
        throw new Error('This tag does not exist');
    }

    if (!name && !colorHEX) {
        res.status(400);
        throw new Error('Please enter a field to update');
    }

    // gather all the fields in which we want to update
    if (name) {
        update["name"] = name;
    }

    if (colorHEX) {
        update["colorHEX"] = colorHEX;
    }

    const tag = await Tag.findByIdAndUpdate(tagID, update, {new: true});

    if (tag) {
        res.status(200);
        res.send(tag);
    }
    else {
        res.status(400);
        throw new Error('Tag could not be updated');
    }
});

// @desc    Create site
// @route   POST /api/vault/{vaultID}/site
const createSite = asyncHandler(async (req, res) => {
    const vaultID = req.params.vaultID;
    const { name, url } = req.body;

    const vaultExists = await Vault.findById(vaultID);

    if (!vaultExists) {
        res.status(400);
        throw new Error('This vault does not exist');
    }

    if (!name || !url) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    const site = await Site.create({
        name: name,
        url: url
    });

    if (!site) {
        res.status(400);
        throw new Error('Could not create the site');
    }

    const vault = await Vault.findOneAndUpdate(
        { _id: vaultID }, 
        { $push: { 
            sites: site
        }
    }, {new: true});

    if (vault) {
        res.status(200);
        res.send(vault);
    }
    else {
        res.status(400);
        throw new Error('Tag could not be updated');
    }
});

// @desc    Update site
// @route   PUT /api/vault/{vaultID}/site/{siteID}
const updateSite = asyncHandler(async (req, res) => {
    const vaultID = req.params.vaultID;
    const siteID = req.params.siteID;
    const { name, url } = req.body;
    let update = {}

    const vaultExists = await Vault.findById(vaultID);

    if (!vaultExists) {
        res.status(400);
        throw new Error('This vault does not exist');
    }

    const siteExists = await Site.findById(siteID);

    if (!siteExists) {
        res.status(400);
        throw new Error('This site does not exist');
    }

    if (!name && !url) {
        res.status(400);
        throw new Error('Please enter a field to update');
    }

    // gather all the fields in which we want to update
    if (name) {
        update["name"] = name;
    }

    if (url) {
        update["url"] = url;
    }

    const site = await Site.findByIdAndUpdate(siteID, update, {new: true});

    if (site) {
        res.status(200);
        res.send(site);
    }
    else {
        res.status(400);
        throw new Error('Site could not be updated');
    }
});

// @desc    Create account
// @route   POST /api/vault/{vaultID}/site/{siteID}/account
const createAccount = asyncHandler(async (req, res) => {
    const vaultID = req.params.vaultID;
    const siteID = req.params.siteID;
    const { username, password } = req.body;

    const vaultExists = await Vault.findById(vaultID);

    if (!vaultExists) {
        res.status(400);
        throw new Error('This vault does not exist');
    }

    const siteExists = await Site.findById(siteID);

    if (!siteExists) {
        res.status(400);
        throw new Error('This site does not exist');
    }

    if (!username || !password) {
        res.status(400);
        throw new Error('Please enter all fields');
    }



    const account = await Account.create({
        username: username,
        password: password
    });

    if (!account) {
        res.status(400);
        throw new Error('Could not create the account');
    }

    const site = await Site.findOneAndUpdate(
        { _id: siteID }, 
        { $push: { 
            accounts: account
        }
    }, {new: true});

    if (site) {
        res.status(200);
        res.send(site);
    }
    else {
        res.status(400);
        throw new Error('Site could not be updated');
    }
});

// @desc    Update account
// @route   PUT /api/vault/{vaultID}/site/{siteID}/account/{accountID}
const updateAccount = asyncHandler(async (req, res) => {
    const vaultID = req.params.vaultID;
    const siteID = req.params.siteID;
    const accountID = req.params.siteID;

    const { username, password } = req.body;
    let update = {}

    const vaultExists = await Vault.findById(vaultID);

    if (!vaultExists) {
        res.status(400);
        throw new Error('This vault does not exist');
    }

    const siteExists = await Site.findById(siteID);

    if (!siteExists) {
        res.status(400);
        throw new Error('This site does not exist');
    }

    const accountExists = await Account.findById(accountID);

    if (!accountExists) {
        res.status(400);
        throw new Error('This account does not exist');
    }

    if (!username && !password) {
        res.status(400);
        throw new Error('Please enter a field to update');
    }

    // gather all the fields in which we want to update
    if (username) {
        update["username"] = username;
    }

    if (password) {
        update["password"] = password;
    }

    const account = await Account.findByIdAndUpdate(accountID, update, {new: true});

    if (account) {
        res.status(200);
        res.send(account);
    }
    else {
        res.status(400);
        throw new Error('Account could not be updated');
    }
});

module.exports = {
    createVault,
    getVaults,
    updateVault,
    createTag,
    updateTag,
    createSite,
    updateSite,
    createAccount,
    updateAccount,
}