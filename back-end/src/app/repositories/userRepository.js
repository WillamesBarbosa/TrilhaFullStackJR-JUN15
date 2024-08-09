const User = require('../../models/userModel');

class UserRepository {
  async findAll() {
    const users = await User.findAll();

    return users;
  }

  async emailAlreadyExist(email) {
    // eslint-disable-next-line
    const row = await User.findOne({ where: { email: email } });

    return !!row;
  }

  async usernameAlreadyExist(username) {
    // eslint-disable-next-line
    const row = await User.findOne({ where: { username: username } });

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
