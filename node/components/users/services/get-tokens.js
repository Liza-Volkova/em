const Config = require('config');
const JWT = require('jsonwebtoken');
const DateFns = require('date-fns');
const Prisma = require('#libs/prisma');
const Redis = require('#libs/redis');

const GetTokens = async (session) => {
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

	await Prisma.user.update({
		where: { id: session.id },
		data: { refresh_token: refreshToken },
	});
	
	await Redis.set(`token_${token}`, JSON.stringify(tokensData));
	
	return { token, refreshToken }
}

module.exports = GetTokens;