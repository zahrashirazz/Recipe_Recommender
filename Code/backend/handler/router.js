var express = require("express");
var router = express.Router();
var recipeRouter = require('./recipes/router');
var userRouter = require('./users/router');

router.use("/api/v1/recipes", recipeRouter);
router.use("/api/v1/users", userRouter);

module.exports = router;
