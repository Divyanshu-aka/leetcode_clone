class ApiError extends Error {
	/**
	 *
	 * @param {number} statusCode - HTTP status code for the error
	 * @param {string} message- Error message
	 * @param {any[]} errors - Additional error details
	 * @param {string} stack - Stack trace for the error
	 */

	constructor(
		statusCode,
		message = "something went wrong",
		errors = [],
		stack = "",
	) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.success = false;
		this.errors = errors;

		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

export { ApiError };
