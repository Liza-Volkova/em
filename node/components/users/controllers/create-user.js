const CreateUsersService = require('#components/users/services/create-user');
const BaseController = require('#classes/base-controller');

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
		await CreateUsersService(req.body);
		return { message: 'OK'};
	}
}

module.exports = new CreateUserController();