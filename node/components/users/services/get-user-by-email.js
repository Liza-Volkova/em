const Db = require('#libs/database');

const GetUserByEmailService = async (email) => {
	const user = await Db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
	return user;
}

module.exports = GetUserByEmailService;
