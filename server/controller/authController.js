const User = require("../collections/user");
const bcrypt = require("bcrypt");

module.exports = {
  registerUser: async (req, res, next) => {
    const { email, username, password } = req.body;

    const salt = await bcrypt.genSalt(12).catch(err => console.log(err));
    const hashedPassword = await bcrypt
      .hash(password, salt)
      .catch(err => console.log(err));

    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    user.save((err, newUser) => {
      if (err) {
        res.status(400).send(err);
      } else {
        req.session.user = newUser;
        res.status(200).send(req.session.user);
      }
    });
  },
  login: async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await User.find({ username }).catch(err => console.log(err));
    if (user.length) {
      const passwordsMatch = await bcrypt
        .compare(password, user[0].password)
        .catch(err => console.log(err));

      if (passwordsMatch) {
        req.session.user = user[0];
        res.status(200).send(req.session.user);
      } else {
        res.status(200).send("incorrect username/password");
      }
    } else {
      res.status(200).send("incorrect username/password");
    }
  },

  userInfo: (req, res, next) => {
    res.status(200).send(req.session.user);
  }
};
