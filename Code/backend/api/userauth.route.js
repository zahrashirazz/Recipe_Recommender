import express from "express";
import userAuthService from "./userauth.service.js";
const router = express.Router();

//URl to get the users
router.route("/getAllUsers").get(userAuthService.getAllUsers);
router.route("/authorizeUser").post(userAuthService.findUser)
export default router;
