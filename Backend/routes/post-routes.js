const express = require("express");

// a function we can execute that returns a new middleware to check/validate information from the req body
// pass it as a middleware in the necessary routes (i.e. post/patch routes) -> check()
// takes the names of the field in the req body that you want to validate i.e. check('content') or check("name") and chain the methods you need like check("content").not().isEmpty()
// can have multiple middleware stored in an array
// order matters, must go before your functions

const { check } = require("express-validator")

const postsControllers = require("../controllers/posts-controller")

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

const router = express.Router()

router.post("/create", check('content').isLength({min: 5}), postsControllers.createPost)

// ADD THESE LATER ONCE WE HAVE AUTHENTICATED USERS

router.post("/:postID/addLike", postsControllers.addLike)

router.post("/:postID/removeLike", postsControllers.removeLike)

// ^^^^^^^^^^

router.post("/:postID/addComment", check("content").not().isEmpty(), postsControllers.addComment)

router.delete("/:postID/comment/:commentID", postsControllers.deleteComment)

router.patch("/:postID", check("content").isLength({min: 5}), postsControllers.editPost)

router.delete("/:postID", postsControllers.deletePost)

module.exports = router