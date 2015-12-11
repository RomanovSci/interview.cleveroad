/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {
  
  /*************
  *            *
  *   Views    *
  *            *
  *************/
  '/': {
    view: 'homepage'
  },

  '/registration': {
    view: 'registration'
  },

  '/login': {
    view: 'login'
  },

  '/profile': {
    view: 'profile'
  },

  '/items': {
    view: 'items'
  },

  '/users': {
    view: 'users'
  },

  /***************
  *              *
  *   For user   *
  *              *
  ***************/
  'post /api/login': {
    controller: 'User/User',
    action:     'login'
  },

  'post /api/register': {
    controller: 'User/User',
    action:     'createUser'
  },

  'get /api/me': {
    controller: 'User/User',
    action:     'getMyself'
  },

  'put /api/me': {
    controller: 'User/User',
    action:     'updateUser'
  },

  'get /api/user/:id': {
    controller: 'User/User',
    action:     'getUserById'
  },

  'get /api/user': {
    controller: 'User/User',
    action:     'searchUsers'
  },

  /***************
  *              *
  *   For items  *
  *              *
  ***************/
  'get /api/item': {
    controller: 'Item/Item',
    action:     'searchItems'
  },

  'get /api/item/:id': {
    controller: 'Item/Item',
    action:     'getItemById'
  },

  'put /api/item/:id': {
    controller: 'Item/Item',
    action:     'updateItem'
  },

  'delete /api/item/:id': {
    controller: 'Item/Item',
    action:     'deleteItem'
  },

  'post /api/item': {
    controller: 'Item/Item',
    action:     'createItem'
  },

  'post /api/item/:id/image': {
    controller: 'Item/Item',
    action:     'uploadItemImage'
  },

  'delete /api/item/:id/image': {
    controller: 'Item/Item',
    action:     'deleteItemImage'
  }
};
