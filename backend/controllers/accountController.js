const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Vault = require('../models/vault');
const Site = require('../models/site');
const Account = require('../models/account');
const Tag = require('../models/tag');
const { checkUserExists, checkVaultExists } = require('./newVaultController');

// @desc Create new account
// @route POST /api/vault/?vaultId/site/account
const createAccount = asyncHandler(async (req, res) => {
    const vaultId = req.query.vaultId;
    const { name, url, username, password, tags } = req.body;

    if (!vaultId || !name || !url || !username || !password) {
        res.status(400);
        throw new Error('Please provide a vault ID, name, url, username, and password');
    }

    await checkVaultExists(vaultId, res);

    const unresolvedTags = tags ? tags.map(async(tag) => {
        const newTag = await Tag.create({
            name: tag.name,
            colorHEX: tag.colorHEX,
        })
    }) : [];
    const resolvedTags = await Promise.all(unresolvedTags);
    const account = await Account.create({
        username: username,
        password: password,
        tags: resolvedTags,
    });

});

const getAllTags = asyncHandler(async (req, res) => {
    // TODO: Get all tags
});
