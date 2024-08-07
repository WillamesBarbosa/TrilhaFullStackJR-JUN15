// Function responsible for checking the JSON body structure and verifying that it is correct
/* eslint-disable */
function errorInJsonBody(error, request, response, next) {
  try {
    JSON.parse(request.body)
    next();
  } catch (error) {
    return response.status(400).json(
      {
        Error: 'Bad Request',
        message: 'The JSON provided in the request body is malformed. Please check the JSON structure and ensure it is valid.',
      }
    );
  }
}

module.exports = { errorInJsonBody };
