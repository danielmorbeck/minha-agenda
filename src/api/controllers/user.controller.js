let User = require('../models/user.model');

class UserController {
  async index (req, res, next) {
    try {
      const users = await User.find({});
      return res.status(200).send(users);
    } catch (e) {
      console.log(e);
      return res.status(500).send();
    }
  }
};

module.exports = UserController;