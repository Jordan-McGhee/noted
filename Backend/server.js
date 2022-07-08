const express = require("express")
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient
const mongoose = require("mongoose")
const User = require("./models/users-model")
const Post = require("./models/posts-model")

// FOR CONNECTING TO MONGODB SERVER
const password = "CdsiLNos7MAaIdiu"
const url = `mongodb+srv://JordanMcGhee:${password}@noted.yrfz0c3.mongodb.net/noted?retryWrites=true&w=majority`

// connecting to database
mongoose.connect(url).then(() =>{
    console.log("Connected to database!")
}).catch(() => {
    console.log("Could not connect to database.")
})

// ROUTE VARIABLES
const authRoutes = require("./routes/auth-routes")
const userRoutes = require("./routes/user-routes")
const postRoutes = require("./routes/post-routes") 
const HttpError = require("./models/http-error")

const app = express()

// want to parse the information we receive from the user before it reaches our other middlewares
// this converts all incoming json data into regular javascript
app.use(bodyParser.json())

// middleware to work around CORS errors since our front and backend are on separate servers
// attaches headers on its responses to prevent the browser from blocking the response
app.use((req, res, next) => {
    // determines which domains have access, the * means all are acceptable
    res.setHeader("Access-Control-Allow-Origin", "*")

    // specifies which headers are allowed on incoming requests to be handled by this API
    // Content-Type and Authorization are the only 2 that aren't default in this group
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization")

    // allowed methods for incoming requests
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
    
    next()
})

// HOME PAGE ROUTE
// need to change information sent to frontend
app.get("/", async (req, res, next) => {
    let users
    let posts

    try {
        users = await User.find({}, "-password")
        posts = await Post.find({})
        // console.log(users)
        console.log(posts)
    } catch(err) {
        const error = new HttpError(
            "Fetching users failed, please try again!", 500
        )

        return next(error)
    }

    // console.log(users)
    res.json({
        users: users.map( user => user.toObject({ getters: true })),
        posts: posts.map( post => post.toObject({ getters: true }))
    })
})

app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/post", postRoutes)

// middleware for requests that didn't get a response from our above routes
// if a user goes to a page that isn't part of our API
// make sure to pass the new error object we created through next so it enters our default error middleware below
app.use((req, res, next) => {
    const error = new HttpError("Could not find this page!", 404)
    next(error)
})

// ERROR ROUTE
// middleware with 4 parameters is treated as a special middleware by express and will only be executed on requests that have an error associated with it
app.use((error, req, res, next) => {

    // checks to see if we've already sent the error response with a header to the end user
    if (res.headerSent) {
        return next(error)
    }

    // if we reach this code, no error message has been sent, so we will send one now
    // Checks for a code/message attached to the error object, or sets it to 500 and a default error message
    // this is triggered by either throwing an error or passing an error to next() in our routes
    // HAS TO BE PASSED IN NEXT() IF ASYNC CODE
    res
        .status(error.code || 500)
        .json({message: error.message || "Something went wrong!"})

})

app.listen(5000)