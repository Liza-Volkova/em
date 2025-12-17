const Prisma = require('#libs/prisma');

const UpdateUserService = async (usersData) => {
	const { id, name, surname } = usersData;
	
	const updatedUser = await Prisma.user.update({
		where: { id },
		data: { name, surname },
		select: {
			id: true,
			name: true,
			surname: true,
			email: true,
		},
	});

	return updatedUser;
}

module.exports = UpdateUserService;
