const validator = require('validator');

const responsesHTTP = require('../../utils/responsesHTTP');
const UserRepository = require('../repositories/userRepository');

class UserController {
  async index(request, response) {
    try {
      const rows = await UserRepository.findAll();

      // checks if rows.length is 0 returning the correct response if it is true
      if (rows.length === 0) {
        response.status(responsesHTTP.NO_CONTENT.status).json(responsesHTTP.NO_CONTENT);
      }

      return response.json(rows);
    } catch (error) {
      return response
        .status(responsesHTTP.INTERNAL_SERVER_ERROR.status)
        .json(responsesHTTP.INTERNAL_SERVER_ERROR);
    }
  }

  async store(request, response) {
    try {
      const {
        full_name,
        username,
        email,
        password,
      } = request.body;

      // Verifies that the email format is valid
      if (!validator.isEmail(email)) {
        return response.status(responsesHTTP.BAD_REQUEST.status).json(responsesHTTP.BAD_REQUEST);
      }

      // Checks if the email or username already exists in the database
      const emailVerification = await UserRepository.emailAlreadyExist(email);
      const usernameVerification = await UserRepository.usernameAlreadyExist(username);

      if (emailVerification || usernameVerification) {
        return response.status(responsesHTTP.CONFLICT.status).json(responsesHTTP.CONFLICT);
      }

      const user = await UserRepository.create(full_name, username, email, password);

      return response.status(201).json(user);
    } catch (error) {
      return response
        .status(responsesHTTP.INTERNAL_SERVER_ERROR.status)
        .json(responsesHTTP.INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = new UserController();
