const Db = require('#libs/database');

const CreateCourseService = async (name, mentor_id) => {
	await Db.none(
		'INSERT INTO courses (name, mentor_id) VALUES ($1, $2)',
		[name, mentor_id],
	);

	return true;
}

module.exports = CreateCourseService;