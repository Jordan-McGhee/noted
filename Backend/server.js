// import fs from "fs"
// import path from "path"

const express = require("express")
const bodyParser = require("body-parser")
// import mongoose from "mongoose"

// FOR CONNECTING TO MONGODB SERVER
// const password = "cceyoMf2dCSYCCk9"
// const url = `mongodb+srv://JordanMcGhee:${password}@noted.drooh.mongodb.net/?retryWrites=true&w=majority`

// ROUTE VARIABLES
// const authRoutes = require("./routes/auth-routes")
const userRoutes = require("./routes/user-routes")
// const userRoutes = require("./routes/user-routes")
// const postRoutes = require("./routes/post-routes")
// const HttpError = require("./models/http-error")

const app = express()

// app.use(bodyParser.json())

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization")
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
    
//     next()
// })

app.use("/user", userRoutes)

// app.use("/auth", authRoutes)

// app.use("/post", postRoutes)

// app.use((req, res, next) => {
//     throw new HttpError("Could not find this route.", 404)
// })

// If we reach this middleware, that means we haven't returned a response on any of the above middleware routes
// app.use((error, req, res, next) => {

//     if (req.file) {
//         fs.unlink(req.file.path, (err) => {
//             console.log(err)
//         })
//     }

//     if (res.headerSent) {
//         return next(error);
//     }

//     // set the status and message unless there is one attached already
//     res.status(error.code || 500);
//     res.json({message: error.message || "An unknown error occurred!"});
// })

app.listen(5000)