// import express from "express";
// import cors from "cors";
// import recipes from "./api/recipes.route.js";
// import users from "./api/userauth.route.js";
// import bodyParser from "body-parser";

const express = require("express");
const cors = require("cors");
const recipes = require("./api/recipes.route");
const users = require("./api/userauth.route");
const bodyParser = require("body-parser");
const router = require("./handler/router");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(router);

//Error thrown when page is not found
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

module.exports = app;
