const User = require('../../models/userModel');

class UserRepository {
  async findAll() {
    const users = await User.findAll();

    return users;
  }

  async emailAlreadyExiste(email) {
    const row = await User.findOne(email);

    return !!row;
  }

  async usernameAlreadyExiste(username) {
    const row = await User.findOne(username);

    return !!row;
  }

  async create(full_name, username, email, password) {
    const row = await User.create(
      {
        full_name,
        username,
        email,
        password,
      },
    );

    return row;
  }
}

module.exports = new UserRepository();
