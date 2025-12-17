const Prisma = require('#libs/prisma');

const UpdateCourseService = async (courseId, updateData) => {
	const { name, description } = updateData;
	
	const data = {};
	if (name !== undefined) {
		data.name = name;
	}
	if (description !== undefined) {
		data.description = description;
	}

	if (Object.keys(data).length === 0) {
		const course = await Prisma.course.findUnique({
			where: { id: parseInt(courseId, 10) },
		});
		return course;
	}

	const updatedCourse = await Prisma.course.update({
		where: { id: parseInt(courseId, 10) },
		data,
	});

	return updatedCourse;
}

module.exports = UpdateCourseService;
