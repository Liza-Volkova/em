const Prisma = require('#libs/prisma');
const SHA256 = require('#helpers/SHA256');

const CreateUsersService = async (usersData) => {
	const { name, surname, password, email } = usersData;

	const hashPassword = SHA256(password); // Пароли надо скрывать

	await Prisma.user.create({
		data: { name, surname, password: hashPassword, email, role: 'student' },
	});

	return true;
}

module.exports = CreateUsersService;