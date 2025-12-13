const Express = require('express');
const Router = require('./routes');
const Config = require('config');
const UsersRouter = require('#components/users/router');
const ErrorsMiddleware = require('#middlewares/errors');
const App = Express(); // Создаем экземпляр express

require('#libs/database'); // Вот тут происходит подключение к бд

require('#libs/redis');
// Middleware для парсинга JSON из тела запроса
App.use(Express.json());

App.use(ErrorsMiddleware);

// Подключаем роутер
App.use(Router);

App.use(UsersRouter);

App.listen(Config.get('SERVER.PORT'), () => { // Запуска сервер
	console.log(`Server started on port ${Config.get('SERVER.PORT')}`)
});