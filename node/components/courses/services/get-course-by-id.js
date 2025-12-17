const Prisma = require('#libs/prisma');

const GetCourseByIdService = async (id) => {

	const course = await Prisma.course.findUnique({
		where: { id: parseInt(id, 10) },
	});

	return course;
}

module.exports = GetCourseByIdService;