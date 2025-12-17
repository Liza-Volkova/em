const CreateCourseService = require('#components/courses/services/create-course');
const GetUserByEmailService = require('#components/users/services/get-user-by-email');
const BaseController = require('#classes/base-controller');
const { ConflictError, NotFoundError } = require('#errors');

class CreateCourseController extends BaseController {
	get bodySchema() {
		return {
			type: 'object',
			required: ['name', 'email'],
			additionalProperties: false,
			properties: {
				name: { type: 'string' },
				email: { type: 'string', format: 'email' },
			}
		}
	}

	async controller(req) {
		const { name, email } = req.body;

		const user = await GetUserByEmailService(email);

		if (!user) {
			throw new NotFoundError({
                code: 'not_found',
				text: 'Пользователь с таким email не найден',
				data: { email }
            })
		}
        if(user.role !== 'mentor') {
            throw new ConflictError({
                code: 'user_ist_mentor',
				text: 'Этот пользователь не является ментором',
				data: { email }
            })
        }

		await CreateCourseService(name, user.id);
		return { message: 'OK'};
	}
}

module.exports = new CreateCourseController();