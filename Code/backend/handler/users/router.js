var express = require("express");
var router = express.Router();
const logger = require("../../helpers/logger")(module);


router.get("/", function(req, res, next) {
    logger.log('info', `User Get API`);
    res.send("Success User");
});

module.exports = router;
