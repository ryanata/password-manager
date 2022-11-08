const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Vault = require('../models/vault');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const Tag = require('../models/tag');

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

module.exports = {
    createVault,
    getVaults,
    updateVault,
    createTag,
    updateTag,
}