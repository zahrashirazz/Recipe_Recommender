var express = require("express");
var router = express.Router();
const logger = require("../../helpers/logger")(module);


router.get("/", function(req, res, next) {
    logger.log('info', `Recipe Get API`);
    res.send("Success Recipe");
});

module.exports = router;
