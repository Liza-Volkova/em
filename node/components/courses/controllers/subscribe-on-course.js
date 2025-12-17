const GetCourseByIdService = require('#components/courses/services/get-course-by-id');
const GetUserByEmailService = require('#components/users/services/get-user-by-email');
const BaseController = require('#classes/base-controller');
const { ConflictError, NotFoundError } = require('#errors');
const SubscribeOnCourseService = require('../services/subscribe-on-course');

class SubscribeOnCourseController extends BaseController {
	get bodySchema() {
		return {
			type: 'object',
			required: ['id', 'email'],
			additionalProperties: false,
			properties: {
				id: { type: 'string', pattern: '^\\d+$' },
				email: { type: 'string', format: 'email' },
			}
		}
	}

	async controller(req) {
        const { id, email } = req.body;

        const course = await GetCourseByIdService(id);
		if (!course) {
			throw new NotFoundError({
                code: 'not_found',
				text: 'Курс с таким id не найден',
				data: { id }
            })
		}

        const user = await GetUserByEmailService(email);
        if(!user) {
            throw new NotFoundError({
                code: 'not_found',
				text: 'Пользователь с таким email не найден',
				data: { email }
            })
        }

		const studentIds = course.student_ids || [];
		const existingStudent = studentIds.find((studentId) => studentId === user.id);
		
		if (existingStudent !== undefined) {
			throw new ConflictError({
				code: 'conflict',
				text: 'Пользователь с таким email уже записан на курс',
				data: { email }
			})
		}
		const updatedCourse = await SubscribeOnCourseService(course, user.id);
		return updatedCourse;
	}
}

module.exports = new SubscribeOnCourseController();