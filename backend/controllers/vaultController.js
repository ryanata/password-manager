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
const updateVault = asyncHandler(async (req, res) => {
    const vaultID = req.params.vaultID;
    const { vaultName, masterPassword, phoneNumber } = req.body;
    let vaultNameUpdated = false;

    const vaultExists = await Vault.findById(vaultID);

    if (!vaultExists) {
        res.status(400);
        throw new Error('This vault does not exist');
    }

    if (!vaultName && !masterPassword && !phoneNumber) {
        res.status(400);
        throw new Error('Please enter a field to update');
    }

    if (vaultName) {
        const vault = await Vault.findByIdAndUpdate(vaultID, { name: vaultName });

        if (vault) {
            vaultNameUpdated = true;
        }
        else {
            res.status(400);
            throw new Error('Vault name could not be updated');
        }
    }

    res.status(200);
    res.send(vaultNameUpdated);

    // // Check for user with this userID
    // const userExists = await User.findOne({ userID });
    // if (!userExists) {
    //     res.status(400);
    //     throw new Error('User does not exist');
    // }

    // // // Hash password
    // // const salt = await bcrypt.genSalt(10)
    // // const hashedPassword = await bcrypt.hash(password, salt)

    // const vault = await Vault.create({
    //     name: vaultName,
    //     masterPassword: masterPassword,
    //     mfa:  {
    //         phone: phoneNumber
    //     },
    //     userID: userID
    // });

    // if (vault) {
    //     const user = await User.findOneAndUpdate(
    //         { _id: userID }, 
    //         { $push: { 
    //             vaults: vault
    //         } 
    //     });

    //     if (!user) {
    //         res.status(400);
    //         throw new Error('Vault could not be added to user');
    //     }

    //     res.status(201).json({
    //         message: 'Vault created!',
    //         vault: {
    //             name: vault.name,
    //             masterPassword: vault.masterPassword,
    //             mfa: vault.mfa,
    //             userID: vault.userID
    //         },
    //     });
    // } else {
    //     res.status(400);
    //     throw new Error('Vault was not created');
    // }
});

module.exports = {
    createVault,
    updateVault,
}