const Prisma = require('#libs/prisma');

const GetStudentCoursesService = async (studentId) => {
	const courses = await Prisma.course.findMany({
		where: { student_ids: { has: studentId } },
		orderBy: { id: 'asc' },
	});

	return courses;
}

module.exports = GetStudentCoursesService;
