// import express from "express";
// import userAuthService from "./userauth.service.js";
const express = require("express");
const userAuthService = require("./userauth.service");
const router = express.Router();

//URl to get the users
router.route("/authorizeUser").post(userAuthService.findUser);
module.exports = router;
