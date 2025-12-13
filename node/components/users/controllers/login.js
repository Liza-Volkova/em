const GetUsersByEmailAndPAsswordService = require('../services/get-users-by-email-and-password');
const GetTokensService = require('../services/get-tokens');
const BaseController = require('#classes/base-controller');
const { AuthorizationError } = require('#errors');

class LoginController extends BaseController {
	get bodySchema() {
		return {
			type: 'object',
			additionalProperties: false,
			required: ['email', 'password'],
			properties: {
				email: { type: 'string', format: 'email' },
				password: { type: 'string' }
			}
		}
	}

	async controller(req) {
		const { email, password } = req.body;

		const user = await GetUsersByEmailAndPAsswordService(email, password);

		if(!user) {
			throw new AuthorizationError({
				code: 'authorization_failed',
				text: 'Email или пароль не верен'
			})
		}

		const session = {
			id: user.id,
			name: user.name,
			surname: user.surname,
			email: user.email,
		}

		const tokens = GetTokensService(session);

		return tokens
	}
}

module.exports = new LoginController();