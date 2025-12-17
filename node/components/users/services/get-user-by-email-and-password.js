const Prisma = require('#libs/prisma');
const SHA256 = require('#helpers/SHA256');

const GetUserByEmailAndPasswordService = async (email, password) => {
    const hashPassword = SHA256(password);
	const user = await Prisma.user.findUnique({
		where: { email },
	});
	
	if (!user) {
		return null;
	}
	
	if (user.password !== hashPassword) {
		return null;
	}
	
	return {
		id: user.id,
		name: user.name,
		surname: user.surname,
		email: user.email,
		role: user.role,
	};
}

module.exports = GetUserByEmailAndPasswordService;