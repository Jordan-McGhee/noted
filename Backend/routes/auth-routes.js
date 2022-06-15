const express = require("express");
const authControllers = require("../controllers/auth-controller");
const HttpError = require("../models/http-error")

// a function we can execute that returns a new middleware to check/validate information from the req body
// pass it as a middleware in the necessary routes (i.e. post/patch routes) -> check()
// takes the names of the field in the req body that you want to validate i.e. check('content') or check("name") and chain the methods you need like check("content").not().isEmpty()
// can have multiple middleware stored in an array
// order matters, must go before your functions

const { check } = require("express-validator")

// .Router allows us to export these routes and use in server.js
const router = express.Router()

// router.get("/", )

router.post("/signup",
    [
        check("name")
            .not()
            .isEmpty(),
        check("email")
            .normalizeEmail()
            .isEmail(),
        check("password")
            .isLength({min: 6})
    ], authControllers.signUp)

router.post("/login", authControllers.login)

module.exports = router