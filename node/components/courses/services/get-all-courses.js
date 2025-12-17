const Db = require('#libs/database');

const GetAllCoursesService = async () => {
	const courses = await Db.manyOrNone(
		'SELECT * FROM courses ORDER BY id'
	);

	return courses;
}

module.exports = GetAllCoursesService;
