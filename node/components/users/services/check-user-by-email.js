const Db = require('#libs/database');

const CheckUserByEmailService = async (email) => {
	const user = await Db.oneOrNone('SELECT id, email FROM users WHERE email = $1', [email]);
	return user;
}

module.exports = CheckUserByEmailService;
