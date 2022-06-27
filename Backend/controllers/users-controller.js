const HttpError = require("../models/http-error")
const User = require("../models/users-model")

// Finds the user by ID out of all users in DB
// then finds all posts by that user

const getUserByID = async (req, res, next) => {

    // grabs userID from URL and finds that user from DB/Dummy data
    const username = req.params.username

    let user

    try {
        user = await User.findOne({ username: username })
    } catch(err) {
        const error = new HttpError(
            "Something went wrong finding that user. Please try again!", 500
        )

        return next(error)
    }

    // error handling for if there isn't a user
    // creates a new HttpError object and passes it via next for the middleware in our server.js file
    if (!user) {
        return next(new HttpError("Could not find a user with this username.", 404))
    }

    // searches for posts by specific user. Filter returns an empty array, so if the length is 0, we set posts to a default statement

    let posts 
    if (user.posts.length === 0) {
        posts = "This user has no posts!"
    }

    // returns JSON data of user
    res.json({user: user, posts: posts})
}

// these "exports" statements bundle the methods together as properties of a controller object to be used in the routes file
exports.getUserByID = getUserByID