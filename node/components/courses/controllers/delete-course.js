const GetCourseByIdService = require('../services/get-course-by-id');
const DeleteCourseService = require('../services/delete-course');
const BaseController = require('#classes/base-controller');
const { NotFoundError } = require('#errors');

class DeleteCourseController extends BaseController {
	async controller(req) {
		const { id } = req.params;

		const course = await GetCourseByIdService(id);
		
		if (!course) {
			throw new NotFoundError({
				code: 'not_found',
				text: 'Курс не найден',
				data: { id }
			});
		}

		await DeleteCourseService(id);
		
		return { message: 'Курс успешно удален' };
	}
}

module.exports = new DeleteCourseController();
