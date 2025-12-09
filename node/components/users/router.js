const Express = require('express');
const CreateUserController = require('./controllers/create-user');
const GetUsersController = require('./controllers/get-users');
const UpdateUserController = require('./controllers/update-user');

const Router = Express.Router();

Router.post('/users', CreateUserController.run);
Router.get('/users', GetUsersController.run);
Router.patch('/users/:id', UpdateUserController);

module.exports = Router;