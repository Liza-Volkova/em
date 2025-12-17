const Db = require('#libs/database');

const DeleteCourseService = async (courseId) => {
	await Db.none('DELETE FROM courses WHERE id = $1', [courseId]);
	return true;
}

module.exports = DeleteCourseService;
