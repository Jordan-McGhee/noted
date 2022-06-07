const express = require("express");
const usersControllers = require("../controllers/users-controller");
const HttpError = require("../models/http-error")

// .Router allows us to export these routes and use in server.js
const router = express.Router()

// route to get a specific user's page.
router.get("/:userID", usersControllers.getUserByID)

module.exports = router