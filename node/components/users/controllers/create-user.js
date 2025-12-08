const Ajv = require('ajv').default;
const ajvFormats = require('ajv-formats');
const CreateUsersService = require('../services/create-user');

const ajv = new Ajv({ allErrors: true });
ajvFormats(ajv, ['email']);

const schema = {
	type: 'object',
	required: ['name', 'surname', 'password', 'email'],
	additionalProperties: false,
	properties: {
		name: { type: 'string' },
		surname: { type: 'string' },
		email: { type: 'string', format: 'email' },
		password: { type: 'string', pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$" }
	}
}

const validate = ajv.compile(schema);

const CreateUsersController = async (req, res) => {
	const valid = validate(req.body);

	if(!valid) {
		const errors = validate.errors.map(({message, dataPath}) => ({
			field: dataPath,
			message,
		}))

		return res.status(400).send(errors)
	}

	await CreateUsersService(req.body)

	res.send('OK')
}

module.exports = CreateUsersController;