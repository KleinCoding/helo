const bcrypt = require("bcryptjs");

async function user(req, res) {
  if (req.session.user) {
    console.log(req.session.user);
    res.status(200).json(req.session.user);
  } else {
    console.log(req.session.user);
    res.status(401).json("No user logged in");
  }
}

async function registerUser(req, res) {
  const { username, password } = req.body;
  const db = req.app.get("db");
  const foundUser = await db.auth.checkForUsername(username);
  if (foundUser[0]) {
    res.status(401).json("Username is already taken.");
  } else {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    const newUser = await db.auth.registerUser([
      username,
      hash
    ]);
    req.session.user = {
      user_id: newUser[0].user_id,
      username: newUser[0].username
    };
    console.log(req.session.user);
    res.status(200).json(req.session.user);
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  const db = req.app.get("db");
  const foundUser = await db.auth.checkForUsername(username);
  if (!foundUser[0]) {
    res.status(400).json("Username or Password is Incorrect.");
  } else {
    const isAuthenticated = bcrypt.compareSync(password, foundUser[0].hash);
    if (!isAuthenticated) {
      res.status(403).json("Password is incorrect.");
    } else {
      req.session.user = {
        user_id: foundUser[0].user_id,
        username: foundUser[0].username
      };
    }
    console.log("Logged in", req.session.user);
    res.status(200).json(req.session.user);
  }
}

module.exports = {
  user,
  registerUser,
  loginUser
};
