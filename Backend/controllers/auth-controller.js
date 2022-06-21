// used to create a unique id
const { v4: uuidv4 } = require("uuid")
const HttpError = require("../models/http-error")
const { validationResult } = require("express-validator")
const User = require("../models/users-model")

const DUMMY_USERS = [
    { userID: "me", name: "Jordan McGhee", email: "me@test", password: "12345678", numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend1", name: "Chris McGhee", email: "test4@test", password: "12345678", numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend2", name: "Tori McGhee", email: "test1@test", password: "12345678", numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend3", name: "Rhonda McGhee", email: "test2@test", password: "12345678",  numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend4", name: "Thomas McGhee", email: "test3@test", password: "12345678", numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend5", name: "Christopher McGhee", email: "test5@test", password: "12345678", numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend6", name: "Reid McGhee", email: "test6@test", password: "12345678", numberOfPosts: 31, numberOfFriends: 69 }
]

const authPage = (req, res, next) => {

}

const signUp = async (req, res, next) => {

    // looks into req object and checks for any validation errors that were picked up. Returns an object
    const errors = validationResult(req)

    // check to see if there are any errors and throw error if so
    if (!errors.isEmpty()) {
        return next(
            new HttpError("There's something wrong with the information you entered. Please check your inputs.", 401)
        )
    }

    // use object destructuring to grab the necessary values from the user
    const { username, email, password } = req.body

    // check if email is already used by another user
    let existingUser 
    
    try {
        existingUser = await User.findOne({ email: email })

    } catch (err) {
        const error = new HttpError(
            "Signing up failed. Please try again!", 500
        )

        return next(error)
    }

    if (existingUser) {
        const error = new HttpError(
            "User exists already, please login instead!", 422)

        return next(error)
    }

    // saving plain password for now. Will encrypt later
    const newUser = new User ({
        username,
        email,
        password
    })

    try {
        await newUser.save()
    } catch (err) {
        const error = new HttpError(
            "Signing in failed. Please try again.", 500
        )

        return next(error)
    }

    // response
    // getters: true turns the created object into a regular JS object
    res.json({message: "New user created!", user: newUser.toObject({ getters: true })})
}

const login = async (req, res, next) => {
    // grab data from req body
    const { email, password } = req.body

    // establish variable to check if user exists
    let existingUser

    // query DB for user with the email from req.body
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            "Something went wrong trying to find the user. Please try again.", 500
        )

        return next(error)
    }

    // if existingUser is falsey, exit function and throw new error
    if (!existingUser) {
        const error = new HttpError(
            "Could not find a user with that email. Maybe try signing up?", 401
        )

        return next(error)
    }

    // if password doesn't match, throw new error
    if (existingUser.password !== password) {
        const error = new HttpError(
            "Invalid credentials. Something's wrong here.", 401
        )

        return next(error)
    }

    // else there were no issues
    res.json({message: "Successfully logged in!", user: existingUser.toObject({ getters: true })})
}

exports.authPage = authPage
exports.signUp = signUp
exports.login = login