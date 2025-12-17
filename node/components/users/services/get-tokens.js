const Config = require('config');
const JWT = require('jsonwebtoken');
const DateFns = require('date-fns');
const Db = require('#libs/database');
const Redis = require('#libs/redis');

const GetTokens = async (session) => {
	try {
		const now = new Date();
		const tokensData = {
			...session,
			expire: DateFns.addDays(now, 7),
		}

		const refreshTokensData = {
			...session,
			expire: DateFns.addDays(now, 30),
		}

		const token = JWT.sign(tokensData, Config.get('AUTH.TOKEN_KEY'));
		const refreshToken = JWT.sign(refreshTokensData, Config.get('AUTH.REFRESH_TOKEN_KEY'));

		await Db.none('UPDATE users SET refresh_token = $1 WHERE id = $2', [refreshToken, session.id]);
		
		await Redis.set(`token_${token}`, JSON.stringify(tokensData));
		
		return { token, refreshToken };
	} catch (error) {
		throw error;
	}
}

module.exports = GetTokens;