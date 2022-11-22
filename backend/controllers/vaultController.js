const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Vault = require('../models/vault');
const User = require('../models/user');
const Tag = require('../models/tag');
const Site = require('../models/site');
const Account = require('../models/account');

const asyncHandler = require('express-async-handler');
const vault = require('../models/vault');

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
            message: 'Vault created',
            vault: {
                name: vault.name,
                masterPassword: vault.masterPassword,
                mfa: vault.mfa,
                userID: vault.userID,
                vaultID: vault.id
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

    // Populate the vaults with all the sites, accounts, and tags
    const userDeeplyPopulated = await User
        .findById(userID)
        .populate({
            path: 'vaults',
            populate: [
                { path: 'tags' },
                { 
                    path: 'sites',
                    populate: { path: 'accounts' }
                }
            ]
        });
    
    if (!userDeeplyPopulated) {
        res.status(400);
        throw new Error('User does not exist');
    }

    res.status(200).json({
        message: 'Vaults retrieved!',
        userID: userDeeplyPopulated._id,
        vaults: userDeeplyPopulated.vaults
    });
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

// @desc    Delete vault
// @route   DELETE /api/vault/{vaultID}
const deleteVault = asyncHandler(async (req, res) => {
    const vaultID = req.params.vaultID;

    const vaultExists = await Vault.findById(vaultID);

    if (!vaultExists) {
        res.status(400);
        throw new Error('This vault does not exist');
    }

    const vault = await Vault.findByIdAndDelete(vaultID);

    if (vault) {
        res.status(200);
        res.json({
            message: "Vault was deleted"
        });
    }
    else {
        res.status(400);
        throw new Error('Vault could not be deleted');
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

// @desc    Gets all tags
// @route   GET /api/vault/{vaultID}/tag
const getTags = asyncHandler(async (req, res) => {
    const { vaultID } = req.params.vaultID;

    // Check for vault with this vaultID
    const vaultExists = await Vault.findOne({ vaultID });
    if (!vaultExists) {
        res.status(400);
        throw new Error('Vault does not exist');
    }

    const tags = await vaultExists.populate({path: 'tags'});
    console.log(tags);


    if (tags) {
        res.status(200).json({
            tags: tags["tags"]
        });
    } else {
        res.status(400);
        throw new Error('Could not get the tags');
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

// @desc    Delete tag
// @route   DELETE /api/vault/{vaultID}/tag/{tagID}
const deleteTag = asyncHandler(async (req, res) => {
    const vaultID = req.params.vaultID;
    const tagID = req.params.tagID;

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

    const tag = await Tag.findByIdAndDelete(tagID);

    if (tag) {
        res.status(200);
        res.json({
            message: "Tag was deleted"
        });
    }
    else {
        res.status(400);
        throw new Error('Tag could not be deleted');
    }
});

// @desc    Create account
// @route   POST /api/vault/{vaultID}/account
const createAccount = asyncHandler(async (req, res) => {
    const vaultID = req.params.vaultID;
    const { username, password, siteName, siteURL } = req.body;

    const vaultExists = await Vault.find({"_id": vaultID});

    if (!vaultExists) {
        res.status(400);
        throw new Error('This vault does not exist');
    }

    const siteExists = await Vault.findOne({"_id": vaultID, "sites.name": siteName})

    let updatedVault = undefined;

    if (!siteExists) {
        updatedVault = await Vault.findOneAndUpdate(
            { _id: vaultID }, 
            { $push: { 
                sites: [{
                    name: siteName,
                    url: siteURL,
                    accounts: [{
                        username: username,
                        password: password,
                        tags: {}
                    }]
                }]
            }
        }, {new: true});    
    } else {
        updatedVault = await Vault.findOneAndUpdate(
            { _id: vaultID, "sites.name": siteName }, 
            { $push: { 
                "sites.$.accounts": [{
                    username: username,
                    password: password,
                    tags: {}
                }]
            }
        }, {new: true});
    }

    if (updatedVault) {
        res.status(200);
        res.send(updatedVault);
    }
    else {
        res.status(400);
        throw new Error('Vault could not be updated');
    }
});

// @desc    Gets all accounts
// @route   GET /api/vault/{vaultID}/account
const getAccounts = asyncHandler(async (req, res) => {
    const vaultID = req.params.vaultID;

    // Check for vault with this vaultID
    const vaultExists = await Vault.findOne({"_id": vaultID});

    if (!vaultExists) {
        res.status(400);
        throw new Error('Vault does not exist');
    }

    const accounts = vaultExists.sites

    console.log(vaultExists);
    
    if (accounts) {
        res.status(200).json({
            "sites": accounts
        });
    } else {
        res.status(400);
        throw new Error('Could not get the accounts');
    }
});

// @desc    Update account
// @route   PUT /api/vault/{vaultID}/account/{accountID}
const updateAccount = asyncHandler(async (req, res) => {
    const vaultID = req.params.vaultID;
    const accountID = req.params.accountID;

    const { username, password } = req.body;
    let update = {}

    const vaultExists = await Vault.findById(vaultID);

    if (!vaultExists) {
        res.status(400);
        throw new Error('This vault does not exist');
    }

    const accountExists = await Vault.findOne({"_id": vaultID, "sites.accounts._id": accountID});

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

    // use this so the account ID does not change
    update["_id"] = accountID;

    const updatedAccount = await Vault.findOneAndUpdate(
        { _id: vaultID, "sites.accounts._id": accountID }, 
        { 
            "$set": {
                "sites.$.accounts": update,
            }   
        }, 
    {new: true});

    if (updatedAccount) {
        res.status(200);
        res.send(updatedAccount);
    }
    else {
        res.status(400);
        throw new Error('Account could not be updated');
    }
});

// @desc    Delete account
// @route   DELETE /api/vault/{vaultID}/account/{accountID}
const deleteAccount = asyncHandler(async (req, res) => {
    const vaultID = req.params.vaultID;
    const accountID = req.params.accountID;

    const vaultExists = await Vault.findById(vaultID);

    if (!vaultExists) {
        res.status(400);
        throw new Error('This vault does not exist');
    }

    const accountExists = await Vault.findOne({"_id": vaultID, "sites.accounts._id": accountID});

    if (!accountExists) {
        res.status(400);
        throw new Error('This account does not exist');
    }

    const deletedAccount = await Vault.findOneAndUpdate(
        { _id: vaultID, "sites.accounts._id": accountID}, 
        { 
            "$pull": {
                "sites.$.accounts": {_id: accountID},
            },
        }, 
    {new: true});

    console.log("deleted");

    if (deletedAccount) {
        res.status(200);
        res.send(deletedAccount);
    }
    else {
        res.status(400);
        throw new Error('Account could not be deleted');
    }
});

module.exports = {
    createVault,
    getVaults,
    updateVault,
    deleteVault,
    createTag,
    getTags,
    updateTag,
    deleteTag,
    createAccount,
    getAccounts,
    updateAccount,
    deleteAccount
}
