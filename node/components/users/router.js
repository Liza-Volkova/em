const Express = require('express');
const CreateUsersController = require('./controllers/create-user');

const Router = Express.Router();

Router.post('/users', CreateUsersController);

module.exports = Router;