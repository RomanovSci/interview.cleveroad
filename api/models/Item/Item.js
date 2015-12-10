/*
* Item schema
*/
module.exports = {
  tableName: 'items',
  schema: true,	
  attributes: {
  	title: {
  		type: 'string',
  		required: true
  	},
  	price: {
  		type: 'float',
  		required: true
  	},
  	image: 'string',
  	user_id: {
  		model: 'user'
  	},
  	toJSON: function() { 
  		var obj = this.toObject();
  		delete obj.updatedAt;
  		return obj; 
  	}
  }
};

