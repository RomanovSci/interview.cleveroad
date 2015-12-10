var randToken = require('rand-token');

module.exports = {
	createUser: createUser,
	login: login,
	getMyself: getMyself,
	updateUser: updateUser,
	getUserById: getUserById,
	searchUsers: searchUsers
};

function createUser(req, res){	
	var data = req.body;
	data.token = randToken.generate(16);

	User
	 	.create(data)
	 	.exec(function(err, user){
	 		if(err){
	 			return res.serverError();
	 		}

	 		res.ok(user.token);
	 	});
}

function login(req, res){
	User
		.findOne(req.body)
		.exec(function(err, user){
			if(err){
				return res.serverError();
			}
			
			if(!user){
				return res.unprocessableEntity("Wrong email or password");
			}

			res.ok(user.token);
		});
}

function getMyself(req, res){
	res.ok(req.user);
}

function updateUser(req, res){
	var updateData = {};

	for(key in req.body){
		if(req.body[key] !== ''){
			updateData[key] = req.body[key];
		}
	}

	if(req.body.new_password !== ''){
		if(req.body.current_password !== req.user.password){
			return res.unprocessableEntity("Wrong current password");
		} else {
			delete updateData.current_password;
			delete updateData.new_password;
			updateData.password = req.body.new_password;
		}
	}

	User
		.update(
			{id: req.user.id},
			updateData
		).exec(function(err, user){
			if(err){
				return res.serverError();
			}

			res.ok(user);
		});
}

function getUserById(req, res){
	var userId = req.params.id;
	
	User
		.findOne({id: userId})
		.exec(function(err, user){
			if(!user){
				return res.notFound();
			}

			res.ok(user);
		});
}

function searchUsers(req, res){
	var searchData 	= {};
	
	if(req.param('name')){
		searchData.name = req.param('name');
	}

	if(req.param('email')){
		searchData.email = req.param('email');
	}

	User
		.find(searchData)
 		.exec(function(err, users){
 			if(users.length === 0){
 				return res.notFound("Not found users");
 			}

 			res.ok(users);
 		});
}
