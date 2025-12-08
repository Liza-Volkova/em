const GetUsersService = require('../services/get-users');

const GetUsersController = async (req, res) => {
	try {
		const page = req.query.page || 1;
		const limit = req.query.limit || 10;

		const result = await GetUsersService(page, limit);
		res.json(result);
	} catch (error) {
		console.error('Error getting users:', error);
		res.status(500).json({ error: error.message });
	}
}

module.exports = GetUsersController;