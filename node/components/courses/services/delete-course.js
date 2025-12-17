const Prisma = require('#libs/prisma');

const DeleteCourseService = async (courseId) => {
	await Prisma.course.delete({
		where: { id: parseInt(courseId, 10) },
	});
	return true;
}

module.exports = DeleteCourseService;
