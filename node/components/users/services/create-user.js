const Db = require('#libs/database');
const SHA256 = require('../../../helpers/SHA256');

const CreateUsersService = async (usersData) => {
	const { name, surname, password, email } = usersData;

	const hashPassword = SHA256(password); // Пароли надо скрывать

	await Db.none(
		'INSERT INTO users (name, surname, password, email) VALUES ($1, $2, $3, $4)',
		[name, surname, hashPassword, email],
	);

	return true;
}

module.exports = CreateUsersService;