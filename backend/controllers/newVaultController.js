const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Vault = require('../models/vault');
const User = require('../models/user');

// @desc Create new vault
// @route POST /api/vault
const createVault = asyncHandler(async (req, res) => {
    const { userId, name, masterPassword } = req.body;

    if (!name || !masterPassword || !userId) {
        res.status(400);
        throw new Error('Please provide a name, master password, and user ID');
    }

    await checkUserExists(userId, res);

    const userPhone = await User
        .findById(userId)
        .select('phone');
    
    const vault = await Vault.create({
        name: name,
        masterPassword: masterPassword,
        mfa: {
            phone: userPhone.phone,
        },
    });

    // Add vault to user's vaults
    if (vault) {
        console.log(vault);
        const updatedUser = await User.findByIdAndUpdate(
            { _id: userId },
            { $push: { vaults: vault._id } },
            { new: true }
        );
        if (!updatedUser) {
            res.status(400);
            throw new Error('Error adding vault to user');
        }
    } else {
        res.status(400);
        throw new Error('Error creating vault');
    }

    res.status(201).json({
        message: 'Vault created',
        vault: vault,
    });
});

// @desc Get rudimentary vault data (name and id) to populate navbar.
// @route GET /api/vault
const getVaults = asyncHandler(async (req, res) => {
    const userVaults = req.user.vaults;
    const unresolvedVaults = userVaults.map(async (vaultId) => {
        const vault = await Vault.findById(vaultId);
        if (vault) {
            return {
                id: vault._id,
                name: vault.name,
            };
        }
    });
    const resolvedVaults = await Promise.all(unresolvedVaults);
    res.status(200).json({
        message: 'Vaults retrieved',
        vaults: resolvedVaults,
    });
});

// @desc Get vault data
// @route GET /api/vault/:vaultId
const getVault = asyncHandler(async (req, res) => {
    // We are using params because we are not reducing or sorting 
    // GET /api/vault data; this is completely different data.
    const vaultId = req.params.vaultId;
    const vault = mongoose.Types.ObjectId.isValid(vaultId) ? await Vault.findById(vaultId) : false;

    if (!vault) {
        res.status(400);
        throw new Error('Vault does not exist');
    } else {
        res.status(200).json({
            message: 'Vault retrieved',
            vault: vault,
        });
    }
});

// @desc Helper function to check if user exists
const checkUserExists = asyncHandler(async (userId, res) => {
    // Make sure userId is valid ObjectId and user exists
    const userExists = mongoose.Types.ObjectId.isValid(userId) ? await User.findById(userId) : false;
    if (!userExists) {
        res.status(400);
        throw new Error('User does not exist');
    }
});

// @desc Helper function to check if vaultexists
const checkVaultExists = asyncHandler(async (vaultId, res) => {
    // Make sure vaultId is valid ObjectId and vault exists
    const vaultExists = mongoose.Types.ObjectId.isValid(vaultId) ? await Vault.findById(vaultId) : false;
    if (!vaultExists) {
        res.status(400);
        throw new Error('Vault does not exist');
    }
});

module.exports = {
    createVault,
    getVaults,
    getVault,
    checkUserExists,
    checkVaultExists,
};