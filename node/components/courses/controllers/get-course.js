const GetCourseByIdService = require('../services/get-course-by-id');
const BaseController = require('#classes/base-controller');
const { NotFoundError, ForbiddenError } = require('#errors');

class GetCourseController extends BaseController {
	async controller(req) {
		const { id } = req.params;
		const user = JSON.parse(req.state.user);

		const course = await GetCourseByIdService(id);
		
		if (!course) {
			throw new NotFoundError({
				code: 'not_found',
				text: 'Курс не найден',
				data: { id }
			});
		}

		if (user.role === 'admin' || (user.role === 'mentor' && course.mentor_id === user.id)) {
			return course;
		}

		if (user.role === 'student') {
			if (!course.student_ids || !course.student_ids.includes(user.id)) {
				throw new ForbiddenError({
					code: 'forbidden',
					text: 'Вы не записаны на этот курс',
					data: {}
				});
			}
			return course;
		}

		throw new ForbiddenError({
			code: 'forbidden',
			text: 'У вас нет доступа к этому курсу',
			data: {}
		});
	}
}

module.exports = new GetCourseController();
