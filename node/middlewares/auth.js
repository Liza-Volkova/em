const Config = require('config');
const JWT = require('jsonwebtoken');
const { AuthorizationError } = require('#errors');
const GetSessionByTokenService = require('#components/users/services/get-session-by-token');

const AuthorizationMiddleware = async (req, res, next) => {
	const now = Date.now();
	const { authorization } = req.headers;

	try{
		JWT.verify(authorization, Config.get('AUTH.TOKEN_KEY'))
		
		const session = await GetSessionByTokenService(authorization);

		if(!session) {
			throw new Error('Authorization error')
		}

		const tokenExpireDate = new Date(session.expire).getTime();

		if(now > tokenExpireDate) {
			throw new Error('Authorization error')
		}

		req.state = { user: session }
	} catch(error) {
		return next(new AuthorizationError({ code: 'invalid_token', text: 'Токен не валидный' }))
	}

	next();
}

module.exports = AuthorizationMiddleware;