const ErrorsMiddleware = (error, req, res, next) => {
	if(error.statusCode) {
		return res.status(error.statusCode).send({
			code: this.code,
			text: this.text,
			data: this.data
		});
	}

	return res.status(500).send('Technical error');
}

module.exports = ErrorsMiddleware