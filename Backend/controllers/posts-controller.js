const HttpError = require("../models/http-error")

// used to create a unique id
const { v4: uuidv4 } = require("uuid")

const DUMMY_POSTS_HOME = [
    { postID: "post1",
    user:
        { name: "Jordan McGhee", email: "test@test", userID: "me" },
    content: "This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post This is a test post ",
    date: "placeholder for date text",
    comments: [
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment13',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment14',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment15',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment16',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
    ]},
    // { postID: "post2", user: { name: "Tori McGhee", email: "test@test", userID: "friend2"}, content: "This is not a test post", date: "placeholder for date text", comments: [
    //     {
    //         user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
    //         commentID: 'comment17',
    //         content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
    //     },
    //     {
    //         user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
    //         commentID: 'comment18',
    //         content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
    //     },
    //     {
    //         user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
    //         commentID: 'comment19',
    //         content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
    //     },
    //     {
    //         user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
    //         commentID: 'comment20',
    //         content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
    //     },
    // ]},
    // { postID: "post3", user: { name: "Rhonda McGhee", email: "test@test", userID: "friend3"}, content: "This is Mom's test post", date: "placeholder for date text", comments: [
    //     {
    //         user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
    //         commentID: 'comment21',
    //         content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
    //     },
    //     {
    //         user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
    //         commentID: 'comment22',
    //         content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
    //     },
    //     {
    //         user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
    //         commentID: 'comment23',
    //         content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
    //     },
    //     {
    //         user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
    //         commentID: 'comment24',
    //         content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
    //     },
    // ]},
    // { postID: "post4", user: { name: "Thomas McGhee", email: "test@test", userID: "friend4"}, content: "This is Dad's test post", date: "placeholder for date text"},
    // { postID: "post5", user: { name: "Chris McGhee", email: "test@test", userID: "friend1"}, content: "This is Ballin C's test post", date: "placeholder for date text"},
    // { postID: "post6", user: { name: "Rhonda McGhee", email: "test@test", userID: "friend3"}, content: "This is Mom's test again post", date: "placeholder for date text"},
    // { postID: "post7", user: { name: "Thomas McGhee", email: "test@test", userID: "friend4"}, content: "This is Dad's test again post", date: "placeholder for date text"},
    // { postID: "post8", user: { name: "Chris McGhee", email: "test@test", userID: "friend1"}, content: "This is Ballin C's test again post", date: "placeholder for date text"}
]

const createPost = (req, res, next) => {
    // use object destructuring to grab data from the incoming request body

    const { user, content } = req.body

    // create an object with the values you need
    const createdPost = {
        id: uuidv4(),
        user,
        content,
        comments: [],
        numberOfLikes: 0
    }

    DUMMY_POSTS_HOME.unshift(createdPost)

    res.status(201).json({posts: DUMMY_POSTS_HOME, post: createdPost})
}

exports.createPost = createPost