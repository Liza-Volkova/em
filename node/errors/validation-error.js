const BaseError = require('#classes/base-error')

class ValidationError extends BaseError {
	constructor(errorsData) {
		super('Validation error', errorsData);
		this.statusCode = 400; // Исправлено: было 404
	}
}

module.exports = ValidationError;