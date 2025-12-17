const Prisma = require('#libs/prisma');

const GetUsersService = async (page, limit) => {
	const offset = (page - 1) * limit;

	const [users, totalCount] = await Promise.all([
		Prisma.user.findMany({
			skip: offset,
			take: limit,
			orderBy: {
				id: 'asc',
			},
			select: {
				id: true,
				name: true,
				surname: true,
				email: true,
			},
		}),
		Prisma.user.count(),
	]);

	return {
		users,
		pagination: {
			page,
			limit,
			total: totalCount,
			totalPages: Math.ceil(totalCount / limit),
		}
	};
}

module.exports = GetUsersService;