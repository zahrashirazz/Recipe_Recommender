var express = require("express");
var router = express.Router();
var recipeRouter = require('./recipes/router');
var userRouter = require('./users/router');

router.use("/v1/recipes", recipeRouter);
router.use("/v1/users", userRouter);

module.exports = router;
