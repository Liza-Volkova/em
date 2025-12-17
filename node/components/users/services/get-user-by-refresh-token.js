const Prisma = require('#libs/prisma');

const GetUserByRefreshTokenService = async (refreshToken) => {
    const user = await Prisma.user.findUnique({
		where: { refresh_token: refreshToken },
		select: {
			id: true,
			name: true,
			surname: true,
			email: true,
		},
	});

	return user;
}

module.exports = GetUserByRefreshTokenService;