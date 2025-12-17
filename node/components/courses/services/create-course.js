const Prisma = require('#libs/prisma');

const CreateCourseService = async (name, mentor_id) => {
	await Prisma.course.create({
		data: { name, mentor_id },
	});

	return true;
}

module.exports = CreateCourseService;