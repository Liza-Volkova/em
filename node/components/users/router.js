const Express = require('express');
const CreateUsersController = require('./controllers/create-user');
const GetUsersController = require('./controllers/get-users');
const UpdateUserController = require('./controllers/update-user');

const Router = Express.Router();

Router.post('/users', CreateUsersController);
Router.get('/users', GetUsersController);
Router.patch('/users/:id', UpdateUserController);

module.exports = Router;