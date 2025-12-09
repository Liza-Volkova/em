const Db = require('#libs/database');

const UpdateUserService = async (usersData) => {
	const { id, name, surname } = usersData;
	
	await Db.none(
		'UPDATE users SET name = $1, surname = $2 WHERE id = $3',
		[name, surname, id],
	);
	
	const updatedUser = await Db.one(
		'SELECT id, name, surname, email FROM users WHERE id = $1',
		[id],
	);

	return updatedUser;
}

module.exports = UpdateUserService;
