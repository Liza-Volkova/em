const Prisma = require('#libs/prisma');

const GetUserByEmailService = async (email) => {
	const user = await Prisma.user.findUnique({
		where: { email },
		select: {
			id: true,
			name: true,
			surname: true,
			email: true,
			role: true, // Нужен для проверки роли в create-course
		},
	});
	return user;
}

module.exports = GetUserByEmailService;
