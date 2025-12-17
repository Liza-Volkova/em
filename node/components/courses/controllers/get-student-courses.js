const GetStudentCoursesService = require('../services/get-student-courses');
const BaseController = require('#classes/base-controller');

class GetStudentCoursesController extends BaseController {
	async controller(req) {
		const user = JSON.parse(req.state.user);

		const courses = await GetStudentCoursesService(user.id);
		return { courses };
	}
}

module.exports = new GetStudentCoursesController();
