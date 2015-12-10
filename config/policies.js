/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {
  'User/UserController': {
  	'*': 			true,
  	'getMyself': 	['isAuthorized'],	//Only authorized user can watch self prifile
  	'updateUser': 	['isAuthorized'],	//Only authorized user can change self prifile
  	'getUserById':  ['isAuthorized'] 	//Only authorized user can find other user by id
  },

  'Item/ItemController': {
  	'*': 				true,
  	'createItem': 		['isAuthorized'], 	//Only authorized user can create new item
  	'updateItem': 		['isAuthorized'], 	//Only authorized user can update items
  	'deleteItem': 		['isAuthorized'],	//Only authorized user can delete items
  	'uploadItemImage':  true,				//['isAuthorized'],	//Only authorized user can upload item image
  	'deleteItemImage':  ['isAuthorized']	//Only authorized user can delete item image
  }
};
