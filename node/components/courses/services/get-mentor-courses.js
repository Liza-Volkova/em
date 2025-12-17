const Db = require('#libs/database');

const GetMentorCoursesService = async (mentorId) => {
	const courses = await Db.manyOrNone(
		'SELECT * FROM courses WHERE mentor_id = $1 ORDER BY id',
		[mentorId]
	);

	return courses;
}

module.exports = GetMentorCoursesService;
