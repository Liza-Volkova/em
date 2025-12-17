const Db = require('#libs/database');

const GetCourseByIdService = async (id) => {

	const course = await Db.oneOrNone(
		'SELECT * FROM courses WHERE id = $1', [id],
	);

	return course;
}

module.exports = GetCourseByIdService;