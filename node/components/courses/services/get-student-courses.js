const Db = require('#libs/database');

const GetStudentCoursesService = async (studentId) => {
	const courses = await Db.manyOrNone(
		'SELECT * FROM courses WHERE $1 = ANY(student_ids) ORDER BY id',
		[studentId]
	);

	return courses;
}

module.exports = GetStudentCoursesService;
