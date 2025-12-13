const Db = require('#libs/database');

const GetUserByRefreshTokenService = async (refreshToken) => {
    const user = await Db.oneOrNone('SELECT * FROM users WHERE refresh_token = $1', [refreshToken]);

	return user;
}

module.exports = GetUserByRefreshTokenService;