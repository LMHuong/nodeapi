exports.createPostValidator = (req, res, next) => {
	//title validation
	req.check('title', "Write a title for your post.").notEmpty();
	req.check('title', "Title must be from 4 to 150 characters.").isLength({
		min: 4,
		max: 150
	});
	//body validation
	req.check('body', "Write something for your post.").notEmpty();
	req.check('body', "Post body must be from 4 to 2000 characters.").isLength({
		min: 4,
		max: 2000
	});

	// check for errors
	const errors = req.validationErrors();
	//if error show the first one as they happen
	if(errors){
		const firstError = errors.map((error) => error.msg)[0];
		return res.status(400).json({error:firstError});
	}

	//proceed to next middleware
	next();
};

exports.userSignupValidator = (req, res, next) => {
	//name is not null, between 4 to 10 character
	req.check('name', "Username is required!").notEmpty();
	//email not null, valid
	req.check('email', "Email must be between 3 to 32 characters.")
	.matches(/.+\@.+\..+/)
	.withMessage("Email must contain @.")
	.isLength({
		min: 4,
		max: 2000
	});
	//check password
	req.check('password', "Password is required!").notEmpty();
	req.check('password')
	.isLength({min: 6})
	.withMessage("Password must be at least 6 characters.")
	.matches(/\d/)
	.withMessage("Password must contain number(s).")
	// check errors
	const errors = req.validationErrors();
	//if error show the first one as they happen
	if(errors){
		const firstError = errors.map((error) => error.msg)[0];
		return res.status(400).json({error:firstError});
	}

	//proceed to next middleware
	next();

}