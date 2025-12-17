const UpdateUserService = require('#components/users/services/update-user');

const UpdateUserController = async (req, res) => {
	try {
		const usersData = {
			id: parseInt(req.params.id, 10),
			name: req.body.name,
			surname: req.body.surname,
		}

		const updatedUser = await UpdateUserService(usersData);

		res.json(updatedUser);
	} catch (error) {
		console.error('Error updating user:', error);
		res.status(500).json({ error: error.message });
	}
}

module.exports = UpdateUserController;