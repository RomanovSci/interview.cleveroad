/*
* User schema
*/
module.exports = {
  tableName: 'users',
  schema: true,
  attributes: {
  	email: {
  		type: 'string',
  		required: true,
  		unique: true
  	},
  	password: {
  		type: 'string',
  		required: true
  	},
  	token: {
  		type: 'string',
  		required: true,
  		unique: true
  	},
  	phone: {
  		type: 'string',
  		required: true
  	},
  	name: {
  		type: 'string',
  		required: true
  	},
  	toJSON: function() {
                var obj = this.toObject();
                delete obj.password;
                delete obj.token;
                delete obj.createdAt;
                delete obj.updatedAt;
                return obj;
    		}
  }
};

