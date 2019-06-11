const User = require("../collections/user");

module.exports = {
  registerUser: (req, res, next) => {
    const { email, username, password } = req.body;

    const user = new User({
      username,
      email,
      password
    });
    user.save((err, newUser) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(newUser);
      }
    });
  },
  login: (req, res, next) => {
    const { username, password } = req.body;
    console.log(username, password);
    res.status(200).send(req.session.user);
  },

  userInfo: (req, res, next) => {
    res.status(200).send(req.session.user);
  }
};
