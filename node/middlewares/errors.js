const ErrorsMiddleware = (error, req, res, next) => {
	if(error.statusCode) {
		return res.status(error.statusCode).json({
			code: error.code,
			text: error.text,
			data: error.data
		});
	}

	return res.status(500).json({ error: 'Technical error' });
}

module.exports = ErrorsMiddleware;