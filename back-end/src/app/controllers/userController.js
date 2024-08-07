const responsesHTTP = require('../../utils/responsesHTTP');
const UserRepository = require('../repositories/userRepository');

class UserController {
  async store(request, response) {
    try {
      const {
        full_name,
        username,
        email,
        password,
      } = request.body;

      const user = await UserRepository.create(full_name, username, email, password);

      return response.status(201).json(user);
    } catch (error) {
      console.log(error);

      return response
        .status(responsesHTTP.INTERNAL_SERVER_ERROR.status)
        .json(responsesHTTP.INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = new UserController();
