const bcrypt = require("bcrypt");
module.exports = {
  registerUser: (req, res, next) => {
    const { email, username, password } = req.body;
    res.status(200).send(req.session.user);
  },
  login: (req, res, next) => {
    res.status(200).send(req.session.user);
  },

  userInfo: (req, res, next) => {
    res.status(200).send(req.session.user);
  }
};
