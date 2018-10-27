const UserModel = require('../models/user');
const MongooseHelpers = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.auth =  (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(422).send({
      title: "Data missing!",
      detail: "Provide e-mail and password"
    });
  }

  UserModel.findOne({email}, (err, user) => {
    if (err) {
      return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
    }

    if (!user) {
      return res.status(422).send({
        title: "Invalid user!",
        detail: "User does not exist"
      });
    }
    if (user.hasSamePassword(password)) {
      const token = jwt.sign({
        userId: user.id,
        username: user.username
      }, config.SECRET, { expiresIn: '1h' });

      return res.json(token);
    } else {
      return res.status(422).send({
        title: "Wrong data!",
        detail: "Wrong e-mail or password"
      });
    }
  });
};

exports.register = (req, res) => {
  const {username, email, password, passwordConfirmation } = req.body;
  if (!password || !email) {
    return res.status(422).send({
      title: "Data missing!",
      detail: "Provide e-mail and password"
    })
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({
      title: "Invalid password!",
      detail: "Password is not the same as confirmation"
    })
  }

  UserModel.findOne({email}, (err, foundUser) => {
    if (err) {
      return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
    }

    if (foundUser) {
      return res.status(422).send({ title: 'Invalid email', detail: 'User with this email already exists'});
    }

    const user = new UserModel({
      username,
      email,
      password
    });

    user.save(err => {
      if (err) {
        return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
      }
      return res.json({'registered': true});
    });
  });
};

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    const user = parseToken(token);
    UserModel.findById(user.userId, function(err, user){
      if (err) {
        return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
      }

      if (user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    });
  } else {
    return notAuthorized(res);
  }
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res) {
  return res.status(401).json({ errors: [{title: 'Not authorized', detail: 'You need to login to get access!'}]});
}