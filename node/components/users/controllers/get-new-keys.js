const GetUserByRefreshTokenService = require('../services/get-user-by-refresh-token');
const GetTokensService = require('../services/get-tokens');
const BaseController = require('#classes/base-controller');
const JWT = require('jsonwebtoken');
const Config = require('config');
const { AuthorizationError, NotFoundError } = require('#errors');

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

		// Проверяем валидность токена
		let decoded;
		try {
			decoded = JWT.verify(refresh_token, Config.get('AUTH.REFRESH_TOKEN_KEY'));
			
			const tokenExpireDate = new Date(decoded.expire).getTime();
			if (now > tokenExpireDate) {
				throw new AuthorizationError({
					code: 'token_expired',
					text: 'Refresh token истек',
					data: {}
				});
			}
		} catch (error) {
			// Если это уже наш кастомный error, пробрасываем дальше
			if (error.statusCode) {
				throw error;
			}
			// Иначе - невалидный токен
			throw new AuthorizationError({
				code: 'invalid_token',
				text: 'Невалидный refresh token',
				data: {}
			});
		}

		// Ищем пользователя по refresh_token
		const user = await GetUserByRefreshTokenService(refresh_token);

		if (!user) {
			throw new NotFoundError({
				code: 'user_not_found',
				text: 'Пользователь не найден',
				data: {}
			});
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