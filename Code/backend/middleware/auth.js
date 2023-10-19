const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

module.exports = (req, res, next) => {
  // const token = req.header('authorization');
  // if (!token) return res.status(401).send('Access Denied!');
  // try {
  //     const verified = jwt.verify(token, JWT_SECRET);
  //     req.user = verified._user;
  //     next();
  // } catch (err) {
  //     res.status(400).send('Invalid Token');
  // }
  next();
};
