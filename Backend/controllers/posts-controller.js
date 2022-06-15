const HttpError = require("../models/http-error")
const { validationResult } = require("express-validator")

// used to create a unique id
const { v4: uuidv4 } = require("uuid")

let DUMMY_POSTS_HOME = [
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
    { postID: "post2", user: { name: "Tori McGhee", email: "test@test", userID: "friend2"}, content: "This is not a test post", date: "placeholder for date text", comments: [
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment17',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment18',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment19',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment20',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
    ]},
    { postID: "post3", user: { name: "Rhonda McGhee", email: "test@test", userID: "friend3"}, content: "This is Mom's test post", date: "placeholder for date text", comments: [
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment21',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment22',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment23',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment24',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
    ]},
    { postID: "post4", user: { name: "Thomas McGhee", email: "test@test", userID: "friend4"}, content: "This is Dad's test post", date: "placeholder for date text"},
    { postID: "post5", user: { name: "Chris McGhee", email: "test@test", userID: "friend1"}, content: "This is Ballin C's test post", date: "placeholder for date text"},
    { postID: "post6", user: { name: "Rhonda McGhee", email: "test@test", userID: "friend3"}, content: "This is Mom's test again post", date: "placeholder for date text"},
    { postID: "post7", user: { name: "Thomas McGhee", email: "test@test", userID: "friend4"}, content: "This is Dad's test again post", date: "placeholder for date text"},
    { postID: "post8", user: { name: "Chris McGhee", email: "test@test", userID: "friend1"}, content: "This is Ballin C's test again post", date: "placeholder for date text"}
]

const createPost = (req, res, next) => {

    // looks into req object and checks for any validation errors that were picked up. Returns an object
    const errors = validationResult(req)

    // check to see if there are any errors and throw error if so
    if (!errors.isEmpty()) {
        console.log(errors)
        throw new HttpError("Your post must be 5 characters or longer! Please try again.")
    }

    // use object destructuring to grab data from the incoming request body

    const { user, content } = req.body

    // create an object with the values you need
    const createdPost = {
        id: uuidv4(),
        user,
        content,
        comments: [],
        usersThatLikeThisPost: []
    }

    DUMMY_POSTS_HOME.unshift(createdPost)

    res.status(201).json({posts: DUMMY_POSTS_HOME, post: createdPost})
}

// ADD THESE LATER ONCE WE HAVE AUTHENTICATED USERS
const addLike = (req, res, next) => {

}

const removeLike = (req, res, next) => {

}

const addComment = (req, res, next) => {

}

const removeComment = (req, res, next) => {

}

// ^^^^^^^^^^^^^^^^^^^^^^^^^

const editPost = (req, res, next) => {

    // looks into req object and checks for any validation errors that were picked up. Returns an object
    const errors = validationResult(req)

    // check to see if there are any errors
    if (!errors.isEmpty()) {
        console.log(errors)
        throw new HttpError("Your post must be 5 characters or longer! Please try again.")
    }

    const { content } = req.body

    // find post from url
    let chosenPostID = req.params.postID

    // Changing data like this is bad practice because an async task may fail and not all data will be updated correctly
    // chosenPost.content = content

    // correct way to update an object via patch request:
    // create a copy of the item, change the copy, and only when it's finished changing, replace the original with the updated copy
    // create copy with the spread (...) operator, find that post's index in the dummy array

    const chosenPost = { ...DUMMY_POSTS_HOME.find(post => post.postID === chosenPostID) }
    const postIndex = DUMMY_POSTS_HOME.findIndex(post => post.postID === chosenPostID)

    // check to see if there is a post. If not, throw error and exit function
    if (!chosenPost) {
        throw new HttpError("Could not find this post!", 404)
    }

    // grabbed old content of post for troubleshooting
    let oldContent = chosenPost.content

    // make the updates, then replace the original post with the copy at the index
    chosenPost.content = content
    DUMMY_POSTS_HOME[postIndex] = chosenPost

    res.status(200).json({message: "Updated post!", post: chosenPost, newContent: chosenPost.content, oldContent: oldContent})
}


const deletePost = (req, res, next) => {
    // deletes chosen post, filtering through dummy data to find the post to omit
    // console logs for troubleshooting

    let chosenPostID = req.params.postID
    let chosenPost = DUMMY_POSTS_HOME.find(post => post.postID === chosenPostID)

    if (!chosenPost) {
        throw new HttpError("Could not find this post!", 404)
    }

    // console.log(`PostID: ${chosenPostID}, post: ${chosenPost.content.length}`)

    DUMMY_POSTS_HOME = DUMMY_POSTS_HOME.filter(post => post.postID !== chosenPostID)

    // console.log(`After filter — posts: ${DUMMY_POSTS_HOME}, deletedPost: ${chosenPost.content}`)

    res.status(200).json({message: "Deleted post!", deletedPost: chosenPostID})
}

exports.createPost = createPost
exports.editPost = editPost
exports.addLike = addLike
exports.removeLike = removeLike
exports.addComment = addComment
exports.removeComment = removeComment
exports.deletePost = deletePost