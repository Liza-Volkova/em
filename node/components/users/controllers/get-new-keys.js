const GetUserByRefreshTokenService = require('../services/get-user-by-refresh-token');
const GetTokensService = require('../services/get-tokens');
const BaseController = require('#classes/base-controller');
const JWT = require('jsonwebtoken');
const Config = require('config');

class GetNewKeysController extends BaseController {
	get bodySchema() {
		return {
			type: 'object',
			additionalProperties: false,
			required: ['refresh_token'],
			properties: {
				refresh_token: { type: 'string' }
			}
		}
	}

	async controller(req) {
		const { refresh_token } = req.body;
		const now = Date.now();

		try {
			const decoded = JWT.verify(refresh_token, Config.get('AUTH.REFRESH_TOKEN_KEY'));
			
			const tokenExpireDate = new Date(decoded.expire).getTime();
            
			if (now > tokenExpireDate) {
				throw new Error('Refresh token expired');
			}
		} catch (error) {
			throw new Error('Invalid refresh token');
		}

		const user = await GetUserByRefreshTokenService(refresh_token);

		if (!user) {
			throw new Error('User not found');
		}

		const session = {
			id: user.id,
			name: user.name,
			surname: user.surname,
			email: user.email,
		}

		const tokens = await GetTokensService(session);

		return tokens;
	}
}

module.exports = new GetNewKeysController();