const Config = require('config');
const PG = require('pg-promise')();

const connection = PG({
	host: Config.get('DATABASE.HOST'),
	port: Config.get('DATABASE.PORT'),
	user: Config.get('DATABASE.USER'),
	password: Config.get('DATABASE.PASSWORD'),
	database: Config.get('DATABASE.NAME')
});

module.exports = connection;