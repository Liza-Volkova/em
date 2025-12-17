const GetMentorCoursesService = require('../services/get-mentor-courses');
const BaseController = require('#classes/base-controller');

class GetMentorCoursesController extends BaseController {
	async controller(req) {
		const user = JSON.parse(req.state.user);

		const courses = await GetMentorCoursesService(user.id);
		return { courses };
	}
}

module.exports = new GetMentorCoursesController();
