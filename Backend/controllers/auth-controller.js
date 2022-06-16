// used to create a unique id
const { v4: uuidv4 } = require("uuid")
const HttpError = require("../models/http-error")
const { validationResult } = require("express-validator")

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

const signUp = (req, res, next) => {

    // looks into req object and checks for any validation errors that were picked up. Returns an object
    const errors = validationResult(req)

    // check to see if there are any errors and throw error if so
    if (!errors.isEmpty()) {
        console.log(errors)
        throw new HttpError("There's something wrong with the information you entered. Please check your inputs.", 401)
    }

    // use object destructuring to grab the necessary values from the user
    const { username, email, password } = req.body

    // check if email is already in list of users
    let hasUser = DUMMY_USERS.find(user => user.email === email)

    if (hasUser) {
        // has to be throw here instead of next(error) since it's not async
        throw new HttpError("User already exists with that email! Want to sign in?", 422)
    }

    // create a new user with the given values from above and initialize the other variables 
    const newUser = {
        userID: uuidv4(),
        username,
        email,
        password,
        posts: [],
        friends: []
    }

    // push new user to dummy data
    DUMMY_USERS.push(newUser)

    // response
    res.json({message: "New user created!", user: newUser})
}

const login = (req, res, next) => {
    // grab data from req body
    const { email, password } = req.body

    // filter through list of existing users and find one with matching email (if possible)
    let loggedInUser = DUMMY_USERS.filter(user => user.email === email)

    // check if loggedInUser is falsey or if password doesn't match
    if (!loggedInUser || loggedInUser.password !== password) {
        // has to be throw here instead of next(error) since it's not async
        throw new HttpError("Invalid credientials. Something's wrong here", 401)
    }
    
    // else there were no issues
    res.json({message: "Successfully logged in!", user: loggedInUser})
}

exports.authPage = authPage
exports.signUp = signUp
exports.login = login