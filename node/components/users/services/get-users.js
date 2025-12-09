const Db = require('#libs/database');

const GetUsersService = async (page, limit) => {
	const offset = (page - 1) * limit;

	const [users, totalCount] = await Promise.all([
		Db.manyOrNone(
			'SELECT id, name, surname, email FROM users ORDER BY id LIMIT $1 OFFSET $2',
			[limit, offset],
		),
		Db.one('SELECT COUNT(*) as count FROM users', [], row => parseInt(row.count))
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