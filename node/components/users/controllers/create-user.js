const CreateUsersService = require('../services/create-user');

const CreateUsersController = async (req, res) => {
	try {
		const usersData = {
			name: req.body.name,
			surname: req.body.surname,
			password: req.body.password,
			email: req.body.email,
		}

		await CreateUsersService(usersData);

		res.send('OK');
	} catch (error) {
		console.error('Error creating user:', error);
		res.status(500).json({ error: error.message });
	}
}

module.exports = CreateUsersController;