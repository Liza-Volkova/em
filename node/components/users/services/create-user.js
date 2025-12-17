const Db = require('#libs/database');
const SHA256 = require('#helpers/SHA256');

const CreateUsersService = async (usersData) => {
	const { name, surname, password, email } = usersData;

	const hashPassword = SHA256(password); // Пароли надо скрывать

	await Db.none(
		'INSERT INTO users (name, surname, password, email, role) VALUES ($1, $2, $3, $4, $5)',
		[name, surname, hashPassword, email, 'student'],
	);

	return true;
}

module.exports = CreateUsersService;