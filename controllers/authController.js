const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = asyncHandler(async (req, res) => {
	const { username, password } = req.body;
    
	// Get user details by username
	const user = await User.findByUsername(username);
    
	// Check password
	if (user.password === password) {
		const userObj = {
			id: user.id
		};
		const token = jwt.sign(userObj, process.env.JWT_SECRET);
		res.cookie('access_token', token, {
			httpOnly: true,
			sameSite: true,
			maxAge: 24 * 60 * 60 * 1000
		});
		return res.status(200).json({ message: 'Login Success', user: { id: user.id } });
	} else {
		res.status(401).json({ message: 'Login Failed' });
	}
});

const logout = (req, res) => {
	const token = req.cookies['access_token'];
	if (token) res.clearCookie('access_token');
	return res.status(200).json({ message: 'Log out Success' });
};

module.exports = { login, logout };
