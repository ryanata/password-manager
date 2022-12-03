const asyncHandler = require('express-async-handler');
var generator = require('generate-password');


// @desc    Generate password
// @route   GET /api/generatePassword
const generatePassword = asyncHandler(async (req, res) => {
    const { length, uppercase, lowercase, numbers, symbols } = req.body;

    if (uppercase === undefined || lowercase === undefined || numbers === undefined || symbols === undefined) {
        res.status(400);
        throw new Error('Please enter all required fields: uppercase, lowercase, numbers, symbols');
    }

    // Only add length if it is not empty
    try {
        const password = generator.generate({
            ...(length && { length: length }),
            numbers: numbers,
            symbols: symbols,
            uppercase: uppercase,
            lowercase: lowercase,
        });
        res.status(200).json({ password });
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

module.exports = {
    generatePassword,
};