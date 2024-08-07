const User = require('../../models/userModel');

class UserRepository {
  async findAll() {
    const users = await User.findAll();

    return users;
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
