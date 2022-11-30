const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Vault = require('../models/vault');
const User = require('../models/user');
const mongoose = require('mongoose');

const asyncHandler = require('express-async-handler');

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
// @route GET /api/vault/:vaultID
const getVault = asyncHandler(async (req, res) => {
    // We are using params because we are not reducing or sorting 
    // GET /api/vault data; this is completely different data.
    const vaultId = req.params.vaultID;
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

// @desc    Update vault
// @route   PUT /api/vault/{vaultID}
// Can be used to update name, masterPassword, or phone
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

// @desc Update a site
// @route PUT /api/vault/?vaultID/site/
const updateSite = asyncHandler(async (req, res) => {
    const vaultId = req.params.vaultID;

    const { oldName, name, url } = req.body;

    if (!vaultId || !oldName || (!name && !url)) {
        res.status(400);
        throw new Error('Please provide a vault ID, old site name, and new site name or url');
    }

    const vault = await checkVaultExists(vaultId, res);

    // Since name is unique, check if a site already exists with that name
    const allSites = await Vault.findById(vaultId).select('sites');
    // Find site with matching name's index (if it exists) else return -1
    const siteIndex = allSites.sites.findIndex(site => site.name === oldName);
    if (siteIndex === -1) {
        res.status(400);
        throw new Error('Site does not exist');
    }

    const existingSite = vault.sites[siteIndex];
    if (name) {
        existingSite.name = name;
    }
    if (url) {
        existingSite.url = url;
    }

    const updatedVault = await vault.save();
    if (!updatedVault) {
        res.status(400);
        throw new Error('Error updating site');
    }
    res.status(200).json({
        message: 'Site updated',
        vault: updatedVault
    });
});

// @desc Delete a site
// @route DELETE /api/vault/?vaultID/site/?siteID
const deleteSite = asyncHandler(async (req, res) => {
    const vaultId = req.params.vaultID;
    const siteId = req.params.siteID;

    if (!vaultId || !siteId) {
        res.status(400);
        throw new Error('Please provide a vault ID and site ID');
    }

    await checkVaultExists(vaultId, res);
    const siteExists = await Vault.findOne({"_id": vaultId, "sites._id": siteId});
    if (!siteExists) {
        res.status(400);
        throw new Error('Site does not exist');
    }

    const deletedSite = await Vault.findOneAndUpdate(
        { _id: vaultId, "sites._id": siteId}, 
        { 
            "$pull": {
                "sites": { "_id": siteId }
            },
        }, 
    {new: true});

    if (!deletedSite) {
        res.status(400);
        throw new Error('Error deleting site');
    }

    res.status(200).json({
        message: 'Site deleted',
        vault: deletedSite
    });
});

// @desc Set the site's accounts array
// @route PUT /api/vault/?vaultID/setSites
const setSites = asyncHandler(async (req, res) => {
    const vaultId = req.params.vaultID;
    const { sites } = req.body;
   
    if (!vaultId || !sites) {
        res.status(400);
        throw new Error('Please provide a vault ID and sites');
    }
    
    if (!Array.isArray(sites)) {
        res.status(400);
        throw new Error('Sites must be an array');
    }

    const vault = await checkVaultExists(vaultId, res);
    const oldSites = vault.sites;
    
    if (oldSites.length !== sites.length) {
        res.status(400);
        throw new Error('Sites array must be the same length as the old sites array');
    }

    // Use the $set operator to update the sites array
    const updatedVault = await Vault.findOneAndUpdate(
        { _id: vaultId },
        {
            "$set": {
                "sites": sites
            }
        },
        { new: true }
    );

    if (!updatedVault) {
        res.status(400);
        throw new Error('Error updating sites');
    }

    res.status(200).json({
        message: 'Sites updated',
        vault: updatedVault
    });
});

// @desc Search the sites array
// @route GET /api/vault/?vaultID/searchSites/?searchTerm
const searchSites = asyncHandler(async (req, res) => {
    const vaultId = req.params.vaultID;
    const searchTerm = req.params.searchTerm;

    if (!vaultId || !searchTerm) {
        res.status(400);
        throw new Error('Please provide a vault ID and search term');
    }

    await checkVaultExists(vaultId, res);

    // Aggregate the sites array and search for the search term
    const sites = await Vault.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(vaultId) } },
        { $unwind: "$sites" },
        // Search for the search term in the name or url
        { $match: { $or: [{ "sites.name": { $regex: searchTerm, $options: 'i' } }, { "sites.url": { $regex: searchTerm, $options: 'i' } }] } },
        { $project: { _id: 0, sites: 1 } }
    ]);

    if (!sites) {
        res.status(400);
        throw new Error('Error searching sites');
    }

    res.status(200).json({
        message: 'Sites searched',
        // Currently it returns an array of sites like this: [{sites: {name: 'name', url: 'url'}}]
        // So we need to get the sites object from the array
        sites: sites.map(site => site.sites)
    });
});



// @desc Create new account
// @route POST /api/vault/?vaultID/site/account
const createAccount = asyncHandler(async (req, res) => {
    const vaultId = req.params.vaultID;
    // tags are optional
    // name is unique
    const { name, url, username, password, tags } = req.body;

    if (!vaultId || !name || !url || !username || !password) {
        res.status(400);
        throw new Error('Please provide a vault ID, name, url, username, and password');
    }

    const vault = await checkVaultExists(vaultId, res);

    // Just assume frontend deals with tags correctly
    const resolvedTags = tags ? tags : [];
    const account = {
        username: username,
        password: password,
        tags: resolvedTags,
    };
    // Since name is unique, check if a site already exists with that name
    const allSites = await Vault.findById(vaultId).select('sites');
    // Find site with matching name's index (if it exists) else return -1
    const siteIndex = allSites.sites.findIndex(site => site.name === name);
    if (siteIndex !== -1) {
        const existingSite = vault.sites[siteIndex];
        if (existingSite.url !== url) {
            res.status(400);
            throw new Error('Site name already exists with a different URL');
        }

        // Add account to existing site
        existingSite.accounts.push(account);
        const updatedSite = await vault.save();

        if (!updatedSite) {
            res.status(400);
            throw new Error('Error adding account to site');
        }
    } else {
        const newSite = {
            name: name,
            url: url,
            accounts: [account],
        }
        
        vault.sites.push(newSite);
        const updatedVault = await vault.save();
        if (!updatedVault) {
            res.status(400);
            throw new Error('Error adding site to vault');
        }
    }

    const newVault = await Vault.findById(vaultId);
    if (!newVault) {
        res.status(400);
        throw new Error('Error retrieving updated vault');
    }
    res.status(201).json({
        message: 'Account created',
        vault: newVault
    });
});

// @desc    Update account
// @route   PUT /api/vault/{vaultID}/site/account/{accountID}
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
// @route   DELETE /api/vault/{vaultID}/site/{siteID}/account/{accountID}
const deleteAccount = asyncHandler(async (req, res) => {
    const vaultID = req.params.vaultID;
    const siteID = req.params.siteID;
    const accountID= req.params.accountID;

    const vault = await checkVaultExists(vaultID, res);

    // Find site with matching siteID
    const siteIndex = vault.sites.findIndex(site => site._id == siteID);
    if (siteIndex === -1) {
        res.status(400);
        throw new Error('Site does not exist');
    }

    // Find account with matching accountID
    const accountIndex = vault.sites[siteIndex].accounts.findIndex(account => account._id == accountID);
    if (accountIndex === -1) {
        res.status(400);
        throw new Error('Account does not exist');
    }

    let deleted;
    // If site has only 1 account, remove the whole site
    if (vault.sites[siteIndex].accounts.length === 1) {
        // findOneAndUpdate should be faster than save()
        const deletedSite = await Vault.findOneAndUpdate(
            { _id: vaultID, "sites._id": siteID},
            {
                "$pull": {
                    "sites": { "_id": siteID }
                },
            },
        {new: true});
        if (!deletedSite) {
            res.status(400);
            throw new Error('Error deleting site because it has only 1 account');
        }
        deleted = deletedSite;
    } else {
        // Remove account from site
        const deletedAccount = await Vault.findOneAndUpdate(
            { _id: vaultID, "sites.accounts._id": accountID}, 
            { 
                "$pull": {
                    "sites.$.accounts": {_id: accountID},
                },
            }, 
        {new: true});
        if (!deletedAccount) {
            res.status(400);
            throw new Error('Error deleting account');
        }
        deleted = deletedAccount;
    }

    res.status(200).json({
        message: 'Account deleted',
        vault: deleted
    });
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
    return vaultExists;
});

module.exports = {
    createVault,
    getVaults,
    getVault,
    updateVault,
    deleteVault,
    createTag,
    getTags,
    updateTag,
    deleteTag,
    createAccount,
    updateSite,
    deleteSite,
    updateAccount,
    deleteAccount,
    setSites,
    searchSites,
}
