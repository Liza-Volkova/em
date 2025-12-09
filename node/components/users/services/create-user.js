const Db = require('#libs/database');

const CreateUsersService = async (usersData) => {
	const { name, surname, password, email } = usersData;

	const hashPassword = password; // Пароли надо скрывать

	await Db.none(
		'INSERT INTO users (name, surname, password, email) VALUES ($1, $2, $3, $4)',
		[name, surname, hashPassword, email],
	);

	return true;
}

module.exports = CreateUsersService;