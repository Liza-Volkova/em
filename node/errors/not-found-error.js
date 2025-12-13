const BaseError = require('#classes/base-error')

class NotFoundError extends BaseError {
	constructor(errorsData) {
		super('Not found error', errorsData);
		this.statusCode = 404;
	}
}

module.exports = NotFoundError;