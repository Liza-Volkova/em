const Db = require('#libs/database');

const SubscribeOnCourseService = async (course, student_id) => {
    const currentStudentIds = course.student_ids || [];
    const newStudentIds = [...currentStudentIds, student_id];
    await Db.none('UPDATE courses SET student_ids = $1 WHERE id = $2', [newStudentIds, course.id]);
	return await Db.one('SELECT * FROM courses WHERE id = $1', [course.id]);
}

module.exports = SubscribeOnCourseService;