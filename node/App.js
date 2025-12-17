const Express = require('express');
const Router = require('./routes');
const Config = require('config');
const UsersRouter = require('#components/users/router');
const CoursesRouter = require('#components/courses/router');
const ErrorsMiddleware = require('#middlewares/errors');

const App = Express();

require('#libs/database');
require('#libs/redis');

// Middleware для парсинга JSON из тела запроса
App.use(Express.json());

// Подключаем роутеры
App.use(Router);
App.use(UsersRouter);
App.use(CoursesRouter);

// Error-handling middleware должен быть ПОСЛЕ всех роутеров
App.use(ErrorsMiddleware);

App.listen(Config.get('SERVER.PORT'), () => {
	console.log(`Server started on port ${Config.get('SERVER.PORT')}`);
});