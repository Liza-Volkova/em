const Prisma = require('#libs/prisma');

const GetMentorCoursesService = async (mentorId) => {
	const courses = await Prisma.course.findMany({
		where: { mentor_id: mentorId },
		orderBy: { id: 'asc' },
	});

	return courses;
}

module.exports = GetMentorCoursesService;
