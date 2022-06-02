const express = require("express");

// .Router allows us to export these routes and use in server.js
const router = express.Router()

router.get('/', (req, res, next) => {
    console.log("GET request in Users")

    res.json({message: "It works!"})
})

module.exports = router