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
      console.log(full_name, username, email, password);
      const user = await UserRepository.create(full_name, username, email, password);
      return response.status(201).json(user);
    } catch (error) {
      console.log(error);
      return response.status(500);
    }
  }
}

module.exports = new UserController();
