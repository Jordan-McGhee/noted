const HttpError = require("../models/http-error")
const User = require("../models/users-model")

// DUMMY DATA
const DUMMY_USERS = [
    { userID: "me", name: "Jordan McGhee", email: "me@test", numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend1", name: "Chris McGhee", email: "test4@test", numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend2", name: "Tori McGhee", email: "test1@test", numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend3", name: "Rhonda McGhee", email: "test2@test", numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend4", name: "Thomas McGhee", email: "test3@test", numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend5", name: "Christopher McGhee", email: "test5@test", numberOfPosts: 31, numberOfFriends: 69 },
    { userID: "friend6", name: "Reid McGhee", email: "test6@test", numberOfPosts: 31, numberOfFriends: 69 }
]

const DUMMY_POSTS_PROFILE = [
    { postID: "post1", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post ", date: "placeholder for date text", comments: [
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment1',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment2',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment3',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment4',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
    ]},
    { postID: "post2", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is not a test post", date: "placeholder for date text", comments: [
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment5',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment6',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment7',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment8',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
    ]},
    { postID: "post3", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Mom's test post", date: "placeholder for date text", comments: [
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment9',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment10',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment11',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment12',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
    ]},
    { postID: "post4", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Dad's test post", date: "placeholder for date text"},
    { postID: "post5", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Ballin C's test post", date: "placeholder for date text"},
    { postID: "post6", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Mom's test post", date: "placeholder for date text"},
    { postID: "post7", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Dad's test post", date: "placeholder for date text"},
    { postID: "post8", user: { name: "Jordan McGhee", email: "test@test"}, content: "This is Ballin C's test post", date: "placeholder for date text"}
]

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