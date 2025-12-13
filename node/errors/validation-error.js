const BaseError = require('#classes/base-error')

class ValidationError extends BaseError {
	constructor(errorsData) {
		super('Validation error', errorsData);
		this.statusCode = 404;
	}
}

module.exports = ValidationError;