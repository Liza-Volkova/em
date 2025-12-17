const Prisma = require('#libs/prisma');

const SubscribeOnCourseService = async (course, student_id) => {
    const currentStudentIds = course.student_ids || [];
    const newStudentIds = [...currentStudentIds, student_id];
    await Prisma.course.update({
        where: { id: course.id },
        data: { student_ids: newStudentIds },
    });
    return await Prisma.course.findUnique({
        where: { id: course.id },
    });
}

module.exports = SubscribeOnCourseService;