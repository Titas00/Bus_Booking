const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
	// const token = req.cookies['access_token'];
	// console.log(req.cookies);
	// // console.log(`token: ${token}`);
	// try {
	// 	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	// 	req.id = decoded.id;
	// 	next();
	// } catch (err) {
	// 	res.status(401).json({ message: 'Invalid token' });
	// }

	// console.log(req.body);
	req.id = req.body.id;
	next();
}

module.exports = isLoggedIn;
