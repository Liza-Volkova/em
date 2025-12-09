const GetUsersService = require('#components/users/services/get-users');
const BaseController = require('#classes/base-controller');

class GetUsersController extends BaseController {
	get querySchema() {
		return {
			type: 'object',
			additionalProperties: false,
			properties: {
				page: { type: 'string', pattern: '^\\d+$' },
				limit: { type: 'string', pattern: '^\\d+$' }
			}
		}
	}

	Getters(user) {
		return {
			id: user.id,
			name: user.name,
			surname: user.surname,
			email: user.email,
		}
	}

	async controller(req) {
		let { page = 1, limit = 15 } = req.query;
		const result = await GetUsersService(page, limit);
		const formattedUsers = result.users.map(user => this.Getters(user));
		return {
			users: formattedUsers,
			pagination: result.pagination
		};
	}
}

module.exports = new GetUsersController();