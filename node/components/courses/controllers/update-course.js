const GetCourseByIdService = require('../services/get-course-by-id');
const UpdateCourseService = require('../services/update-course');
const BaseController = require('#classes/base-controller');
const { NotFoundError, ForbiddenError } = require('#errors');

class UpdateCourseController extends BaseController {
	get bodySchema() {
		return {
			type: 'object',
			additionalProperties: false,
			properties: {
				name: { type: 'string' },
				description: { type: 'string' },
			}
		}
	}

	async controller(req) {
		const { id } = req.params;
		const user = JSON.parse(req.state.user);
		const updateData = req.body;

		const course = await GetCourseByIdService(id);
		
		if (!course) {
			throw new NotFoundError({
				code: 'not_found',
				text: 'Курс не найден',
				data: { id }
			});
		}

		if (user.role === 'admin' || (user.role === 'mentor' && course.mentor_id === user.id)) {
			const updatedCourse = await UpdateCourseService(id, updateData);
			return updatedCourse;
		}

		throw new ForbiddenError({
			code: 'forbidden',
			text: 'У вас нет прав для изменения этого курса',
			data: {}
		});
	}
}

module.exports = new UpdateCourseController();
