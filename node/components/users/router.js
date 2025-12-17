const Express = require('express');
const CreateUserController = require('./controllers/create-user');
const GetUsersController = require('./controllers/get-users');
const UpdateUserController = require('./controllers/update-user');
const LoginController = require('./controllers/login');
const GetNewKeysController = require('./controllers/get-new-keys');
const AuthorizationMiddleware = require('#middlewares/auth');
const IsMentorMiddleware = require('#middlewares/is-mentor');

const Router = Express.Router();

Router.post('/users', CreateUserController.run);
Router.get('/users', AuthorizationMiddleware, IsMentorMiddleware, GetUsersController.run);
Router.patch('/users/:id', AuthorizationMiddleware, UpdateUserController);
Router.post('/login', LoginController.run);
Router.post('/refresh', GetNewKeysController.run);

module.exports = Router;