const getUser = require("../dao/users/getUser");

class userAuthService {
  static async findUser(req, res, next) {
    try {
      let obj = await getUser(req.body.username);
      if (obj) {
        if (obj.credentials.password == req.body.password) res.json(obj);
        else res.status(500).send("Incorrect password");
      } else res.status(404).send("User not found");
    } catch (err) {
      console.log("error in userauthservice--", err);
      return res.status(500).send("Error Please try again");
    }
  }
}
module.exports = userAuthService;
