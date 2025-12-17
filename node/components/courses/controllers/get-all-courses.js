const GetAllCoursesService = require('../services/get-all-courses');
const BaseController = require('#classes/base-controller');

class GetAllCoursesController extends BaseController {
	async controller(req) {
		const courses = await GetAllCoursesService();
		return { courses };
	}
}

module.exports = new GetAllCoursesController();
