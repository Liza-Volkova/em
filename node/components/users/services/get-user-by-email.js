const Db = require('#libs/database');
const SHA256 = require('#helpers/SHA256');

const GetUserByEmailService = async (email, password) => {
    const hashPassword = SHA256(password);
	const user = await Db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);

	return user.password === hashPassword ? user : null;
}

module.exports = GetUserByEmailService;