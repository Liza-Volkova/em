const Redis = require('#libs/redis');

const GetSessionByTokenService = async (authorization) => {
    const session = await Redis.get(`token_${authorization}`);

	return session;
}

module.exports = GetSessionByTokenService;