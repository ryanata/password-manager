const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Vault = require('../models/vault');
const User = require('../models/user');
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
        userID: userID
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

// @desc    Update vault
// @route   PUT /api/vault/{vaultID}
// can be used to update name, masterPassword, or phone
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

    const vault = await Vault.findOneAndUpdate(
        { _id: vaultID }, 
        { $push: { 
            tags: {
                name: name,
                colorHEX: colorHEX, 
            }
        }
    }, {new: true});

    if (vault) {
        res.status(200);
        res.send(vault);
    }
    else {
        res.status(400);
        throw new Error('Vault could not be updated');
    }
});

module.exports = {
    createVault,
    updateVault,
    createTag
}