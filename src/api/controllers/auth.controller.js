const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

const auth = require('../config/auth.config');

class AuthController {
  static generateJWT (user, res) {
    delete user.password;

    return res.status(200).send({
      user,
      token: jwt.sign({id: user.id}, auth.secret, {
        expiresIn: `311040000 days`
      }),
      expiresIn: new Date().setDate(new Date().getDate() + 311040000)
    });
  }

  async register (req, res, next) {
    try {
      const userExist = await User.findOne({email: req.body.email});

      if (userExist) {
        return res.status(422).send({error: 'User already exist.'});
      }

      const user = await User.create({
        cpf: req.body.cpf,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 8),
        tasks: req.body?.tasks
      });

      return AuthController.generateJWT(user, res);

    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  }

  async login (req, res, next) {
    try {
      const {email, password} = req.body;

      const user = await User.findOne({email});

      if (!user) {
        return res.status(400).send({error: 'User does not exist.'});
      }

      let bcryptPassword = user.password;

      if (!(bcrypt.compareSync(password, bcryptPassword))) {
        return res.status(400).send({error: 'Invalid email or password'});
      }

      return AuthController.generateJWT(user, res);
    } catch (e) {
      console.log(e);
      return res.status(500).send();
    }
  }
};

module.exports = AuthController;