const Express = require('express');
const Router = Express.Router();

Router.get('/', (req, res) => {
	res.send('OK');
});

Router.post('/', (req, res) => {
	res.json({ message: 'OK', data: req.body });
});

module.exports = Router;