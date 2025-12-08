const Db = require('../../../libs/database');

// Вспомогательная функция для валидации пагинации
const validatePagination = (page, limit) => {
	const pageNum = Math.max(1, parseInt(page) || 1);
	const limitNum = Math.max(1, Math.min(100, parseInt(limit) || 10));
	return { pageNum, limitNum };
};

const GetUsersService = async (page, limit) => {
	const { pageNum, limitNum } = validatePagination(page, limit);
	const offset = (pageNum - 1) * limitNum;

	const [users, totalCount] = await Promise.all([
		Db.manyOrNone(
			'SELECT id, name, surname, email FROM users ORDER BY id LIMIT $1 OFFSET $2',
			[limitNum, offset],
		),
		Db.one('SELECT COUNT(*) as count FROM users', [], row => parseInt(row.count))
	]);

	return {
		users,
		pagination: {
			page: pageNum,
			limit: limitNum,
			total: totalCount,
			totalPages: Math.ceil(totalCount / limitNum),
		}
	};
}

module.exports = GetUsersService;