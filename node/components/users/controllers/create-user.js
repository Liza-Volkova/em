const CreateUsersService = require('#components/users/services/create-user');
const GetUserByEmailService = require('#components/users/services/get-user-by-email');
const BaseController = require('#classes/base-controller');
const { ConflictError } = require('#errors');

class CreateUserController extends BaseController {
	get bodySchema() {
		return {
			type: 'object',
			required: ['name', 'surname', 'password', 'email'],
			additionalProperties: false,
			properties: {
				name: { type: 'string' },
				surname: { type: 'string' },
				email: { type: 'string', format: 'email' },
				password: { type: 'string', pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$" }
			}
		}
	}

	async controller(req) {
		const { email } = req.body;

		const existingUser = await GetUserByEmailService(email);

		if (existingUser) {
			throw new ConflictError({
				code: 'user_already_exists',
				text: 'Пользователь с таким email уже существует',
				data: { email }
			});
		}

		await CreateUsersService(req.body);
		return { message: 'OK'};
	}
}

module.exports = new CreateUserController();