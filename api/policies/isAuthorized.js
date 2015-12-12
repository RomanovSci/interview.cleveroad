module.exports = function(req, res, next) {
	var token;

	if (req.headers.authorization) {
		token = req.headers.authorization;
	} else if (req.param('token')) {
		token = req.param('token');
		delete req.query.token;
	} else {
		return res.notFound(401);
	}
	
	User
		.findOne({token: token})
		.exec(function(err, user){
			if(err){
				return res.serverError();
			}

			if(!user){
				return res.notFound(401);
			}

			req.user = user;
			next();
		})

};