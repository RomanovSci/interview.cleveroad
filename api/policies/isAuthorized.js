module.exports = function(req, res, next) {
	var token;

	if (req.headers.authorization) {
		token = req.headers.authorization;
	} else if (req.param('token')) {
		token = req.param('token');
		delete req.query.token;
	} else {
		return res.json(401, {
			detail: 'Unauthorized'
		});
	}

	async.waterfall([
		function(callback) {
			User.findOne({token: token}).exec(callback);
		}, 
		function(user, callback) {
			if(!user){
				return res.json(401, {detail: 'Invalid User Token'});
			}
			
			callback(null, user);
		}], 

		function(err, user) {
		  if(err){ 
		  	return res.status(401).send(err.message); 
		  }

		  req.user = user;
		  next();
	  	});
};