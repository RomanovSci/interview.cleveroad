module.exports = {
	searchItems: searchItems,
	getItemById: getItemById,
	updateItem:  updateItem,
	deleteItem:  deleteItem,
	createItem:  createItem,
	uploadItemImage: uploadItemImage,
	deleteItemImage: deleteItemImage
};

function searchItems(req, res){
	var findData = {};
	findData.title 		= req.param('title');
	findData.price 		= req.param('price');

	//Remove empty field in search query
	for(key in findData){
		if(findData[key] === ''){
			delete findData[key];
		}
	}

	Item
		.find(findData)
		.sort(req.param('order_by') + ' ' + req.param('order_type'))
		.exec(function(err, items){
			if(err){
				return res.serverError();
			}

			if(items.length === 0){
				return res.notFound();
			}

//TODO: Add owners to each items field

			res.ok(items);
		});
}

function getItemById(req, res){
	var iid = req.params.id;
	console.log(iid);

	Item
		.findOne({id: iid})
		.exec(function(err, item){
			if(err){
				return res.serverError();
			}

			if(!item){
				return res.notFound();
			}

//TODO: Add owners to each items field

			res.ok(item);
		});
}

function updateItem(req, res){
	var iid = req.params.id;
	var updateData = req.body;

	//Remove empty field in search query
	for(key in updateData){
		if(updateData[key] === ''){
			delete updateData[key];
		}
	}

	Item
		.findOne({id: iid})
		.exec(function(err ,item){
			if(err){
				return res.serverError();
			}

			if(!item){
				return res.notFound();
			}

			if(item.user_id !== req.user.id){
				return res.forbidden();
			}

			Item
				.update(
					{id: iid},
					updateData
				)
				.exec(function(err, items){
					if(err){
						return res.serverError();
					}

					delete req.user.token;
					delete req.user.createdAt;
					delete req.user.updatedAt;

					items[0].user = req.user;

					res.ok(items[0]);
				});
		});
}

function deleteItem(req, res){
	var iid = req.params.id;

	Item
		.findOne({id: iid})
		.exec(function(err, item){
			if(err){
				return res.serverError();
			}

			if(!item){
				return res.notFound();
			}

			if(item.user_id !== req.user.id){
				return res.forbidden();
			}

			Item
				.destroy({id: iid})
				.exec(function(err){
					if(err){
						res.serverError();
					}

					res.ok();
				});
		});
}

function createItem(req, res){
	var itemData = req.body;
	itemData.user_id = req.user;

	Item
		.create(itemData)
		.exec(function(err, newItem){
			if(err){
				res.serverError();
			}

			delete req.user.token;
			delete req.user.createdAt;
			delete req.user.updatedAt;

			newItem.user = req.user;
			res.ok(newItem);
		});
}

function uploadItemImage(req, res){
	var iid = req.params.id;

	req.file('item_pic').upload({
		dirname: '../../assets/images/items_image'
	},  function (err, file) {
	      	if(err){
	        	return res.serverError();
	      	}

	      	return res.json({
	        	message: file.length + ' file(s) uploaded successfully!',
	        	file: file
	      	});
    });
}

function deleteItemImage(req, res){
	var iid = req.params.id;

	Item
		.findOne({id: iid})
		.exec(function(err, item){
			if(!item){
				return res.notFound();
			}

			if(item.user_id !== req.user.id){
				return res.forbidden();
			} 
				
			Item
				.update({id: iid},
						{image: null})
				.exec(function(err, item){
					if(err){
						return res.serverError();
					}

					res.ok();
				});
			
		});
}
