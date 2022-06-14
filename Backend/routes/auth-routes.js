const express = require("express");
const authControllers = require("../controllers/auth-controller");
const HttpError = require("../models/http-error")

// .Router allows us to export these routes and use in server.js
const router = express.Router()

// router.get("/", )

router.post("/signup", authControllers.signUp)

router.post("/login", authControllers.login)

module.exports = router