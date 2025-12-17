const Db = require('#libs/database');
const SHA256 = require('#helpers/SHA256');

const GetUserByEmailAndPasswordService = async (email, password) => {
    const hashPassword = SHA256(password);
	const user = await Db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
	if (!user) {
		return null;
	}

	return user.password === hashPassword ? user : null;
}

module.exports = GetUserByEmailAndPasswordService;