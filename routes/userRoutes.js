const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('./../models/User');

const router = express.Router();

router.post('/signup', asyncHandler(async (req, res) => {
    const { username, password, name } = req.body;
    
    // create user
    const newUser = new User({username, password, name});
    await newUser.save();

    res.json({ message: 'Signup done. Please login.' });
}));

module.exports = router;