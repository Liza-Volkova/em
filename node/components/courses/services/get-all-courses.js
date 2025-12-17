const Prisma = require('#libs/prisma');

const GetAllCoursesService = async () => {
	const courses = await Prisma.course.findMany({
		orderBy: { id: 'asc' },
	});

	return courses;
}

module.exports = GetAllCoursesService;
