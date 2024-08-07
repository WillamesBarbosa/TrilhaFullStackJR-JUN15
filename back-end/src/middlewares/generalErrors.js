function generalErrors(error, request, response, next) {
  return response.status(500).json({
    Error: 'Internal Server Error',
    message: 'An unexpected error occurred. Please try again later.',
  });
}

module.exports = generalErrors;
