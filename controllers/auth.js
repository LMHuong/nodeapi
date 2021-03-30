const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const expressJwt = require('express-jwt');

exports.signup = async (req, res) => {
	const userExists = await User.findOne({email: req.body.email});
	if(userExists) return res.status(403).json({
		error: "Email already exist!"
	});
		const user = await new User(req.body);
		await user.save();
		res.status(200).json({message: "Signup successful! Please login."});
	};

	exports.signin = (req, res) => {
	//find user based on email
	const {email, password} = req.body;
	User.findOne({email}, (err, user) => {
		//if err - no user
		if (err || !user) {
			return res.status(401).json({
				error: "User have not registered with this email. Please signup first."
			})
		}
		//if user found -> email and password match
		// create authenticate method in model and use here
		if (!user.authenticate(password)){
			return res.status(401).json({
				error: "Email and password do not match."
			})
		}
		// generate token with userid and secret (env)
		const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

	    //persist token as 't' in cookie with expiry date
	    res.cookie("t", token, {expire: new Date() + 1000});

	    // return response with user and token to frontend client 
	    const {_id, name, email} = user;
	    return res.json({token, user: {_id, name, email}});
	})
};

exports.signout = (req, res) => {
	//clear cookie with t name
	res.clearCookie('t');
	return res.json({message: "Signout successful!"});

}

exports.requireSignin = expressJwt({
	//if token is valid, express-jwt appends the verified user id
	// in an auth key to the request object
	secret: process.env.JWT_SECRET, algorithms: ['HS256'], 
	userProperty: "auth"
})