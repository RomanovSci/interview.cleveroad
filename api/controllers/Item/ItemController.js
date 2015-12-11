var fs 	 = require('fs');
var path = require('path'); 

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
	var findData 	= {};
	findData.title 	= req.param('title');
	findData.price 	= req.param('price');

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

			res.ok(items);
		});
}

function getItemById(req, res){
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

			res.ok(item);
		});
}

function updateItem(req, res){
	var iid = req.params.id;
	var updateData = req.body;

	if(updateData.title.length < 3){
		return res.unprocessableEntity('"field":"title","message":"Title should contain at least 3 characters"');
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
	var fileName = '';

	req.file('item_pic').upload({dirname: '../../assets/images/item_images'},  function (err, files) {
	    if(err){
        	return res.serverError();
      	}

     	fileName = files[0].fd.slice(-40);

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
				.update({id: iid}, {image: fileName})
				.exec(function(err, items){
					if(err){
						return res.serverError();
					}

					res.ok(items[0]);
				});
		});
    });
}

function deleteItemImage(req, res){
	var iid 	  = req.params.id;
	var imageLink = '';

	Item
		.findOne({id: iid})
		.exec(function(err, item){
			if(!item){
				return res.notFound();
			}

			if(item.user_id !== req.user.id){
				return res.forbidden();
			}

			if(item.image == null){
				return res.ok();
			} 

			imageLink = path.normalize(path.join(__dirname, '/../../../assets/images/item_images/', item.image));
		 		
			Item
				.update({id: iid},
						{image: null})
				.exec(function(err, item){
					if(err){
						return res.serverError();
					}

					fs.unlinkSync(imageLink);

					res.ok();
				});
		});
}
