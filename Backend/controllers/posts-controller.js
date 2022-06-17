const HttpError = require("../models/http-error")
const { validationResult } = require("express-validator")
const Post = require("../models/posts-model")
const Comment = require("../models/comments-model")

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
    { postID: "post8", user: { name: "Chris McGhee", email: "test@test", userID: "friend1"}, content: "This is Ballin C's test again post", date: "placeholder for date text", comments: [
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment13',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        },
        {
            user: { name: "Jordan McGhee", email: "test@test", userID: "me" },
            commentID: 'comment14',
            content: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment"
        }
    ]}
]

const createPost = async (req, res, next) => {

    // looks into req object and checks for any validation errors that were picked up. Returns an object
    const errors = validationResult(req)

    // check to see if there are any errors and throw error if so
    if (!errors.isEmpty()) {
        console.log(errors)
        throw new HttpError("Your post must be 5 characters or longer! Please try again.")
    }

    // use object destructuring to grab data from the incoming request body
    const { user, content } = req.body

    // create an object with the values you need using post model
    const createdPost = new Post({
        user, 
        content
    })

    try{
        const result = await createdPost.save()
    } catch (err) {
        const error = new HttpError(
            "Creating post failed. Please try again!", 500
        )

        return next(error)
    }
    

    res.status(201).json({ result })
}

// ADD THESE LATER ONCE WE HAVE AUTHENTICATED USERS
const addLike = (req, res, next) => {

}

const removeLike = (req, res, next) => {

}

// ADD TRY CATCH BLOCKS??
const addComment = async (req, res, next) => {
    // looks into req object and checks for any validation errors that were picked up. Returns an object
    const errors = validationResult(req)

    // check to see if there are any errors
    if (!errors.isEmpty()) {
        console.log(errors)
        throw new HttpError("Your post must be 5 characters or longer! Please try again.")
    }

    // grab post ID from url
    const chosenPostID = req.params.postID

    // grab the info from the request body and save it to a new comment object
    const { user, content } = req.body

    const newComment = new Comment ({
        user,
        content
    })

    // save our new comment to the DB, then attach it to the corresponding post using the ID from above
    await newComment.save()
        .then((result) => {
            Post.findById(chosenPostID, (err, post) => {
                // check to see if there is a post. If not, throw error and exit function
                if (post) {

                    // The below two lines will add the newly saved comment's 
                    // ObjectID to the the Post's comments array field
                    post.comments.push(newComment)
                    post.save()

                    // return a response if successful
                    res.status(201).json({ message: "Added new comment!", post: post.content, postComments: post.comments, comment: newComment.content })
                } else {
                    const error = new HttpError("Could not find this post!", 404)

                    return next(error)
                }
        })
    })
}

const deleteComment = (req, res, next) => {
    // deletes chosen comment, filtering through all comments to find the one to omit

    // find the correct post with ID from params
    let chosenPostID = req.params.postID
    let chosenPost = DUMMY_POSTS_HOME.find(post => post.postID === chosenPostID)

    // make sure the post exists
    if (!chosenPost) {
        throw new HttpError("Could not find this post!", 404)
    }

    // do the same process for the comment
    let chosenCommentID = req.params.commentID
    let chosenComment = chosenPost.comments.find(comment => comment.commentID = chosenCommentID)

    if (!chosenComment) {
        throw new HttpError("Could not find this comment!", 404)
    }

    // filter the posts comments to exclude the chosen comment
    chosenPost.comments = chosenPost.comments.filter(comment => comment.commentID !== chosenCommentID)

    res.status(200).json({ message: "Deleted comment!", postComments: chosenPost.comments, deletedComment: chosenComment.content })
}

// ^^^^^^^^^^^^^^^^^^^^^^^^^

const editPost = async (req, res, next) => {

    // looks into req object and checks for any validation errors that were picked up. Returns an object
    const errors = validationResult(req)

    // check to see if there are any errors
    if (!errors.isEmpty()) {
        console.log(errors)
        throw new HttpError("Your post must be 5 characters or longer! Please try again.")
    }

    const { content } = req.body

    let post
    
    try {
        post = await Post.findById(req.params.postID)
    } catch (err) {
        const error = new HttpError(
            "Something went wrong. Could not update place!", 500
        )
        return next(error)
    }
    
    post.content = content

    try {
        await post.save()
    } catch(err) {
        const error = new HttpError(
            "Something went wrong. Could not update place!", 500
        )
        return next(error)
    } 

    res.status(200).json({ post: post.toObject({ getters: true })})

    // Changing data like this is bad practice because an async task may fail and not all data will be updated correctly
    // chosenPost.content = content

    // correct way to update an object via patch request:
    // create a copy of the item, change the copy, and only when it's finished changing, replace the original with the updated copy
    // create copy with the spread (...) operator, find that post's index in the dummy array

    // const chosenPost = { ...DUMMY_POSTS_HOME.find(post => post.postID === chosenPostID) }
    // const postIndex = DUMMY_POSTS_HOME.findIndex(post => post.postID === chosenPostID)

    // check to see if there is a post. If not, throw error and exit function
    // if (!chosenPost) {
    //     throw new HttpError("Could not find this post!", 404)
    // }

    // grabbed old content of post for troubleshooting
    // let oldContent = chosenPost.content

    // // make the updates, then replace the original post with the copy at the index
    // chosenPost.content = content
    // DUMMY_POSTS_HOME[postIndex] = chosenPost

    // res.status(200).json({ message: "Updated post!", post: chosenPost, newContent: chosenPost.content, oldContent: oldContent })
}

// FIX — NOT DELETING BC NOT PROPERLY HANDLING ERROR??

const deletePost = async (req, res, next) => {
    // deletes chosen post, filtering through dummy data to find the post to omit
    // console logs for troubleshooting

    // let chosenPostID = req.params.postID
    // let chosenPost = Post.findById(post => post.postID === chosenPostID)

    // if (!chosenPost) {
    //     throw new HttpError("Could not find this post!", 404)
    // }

    // console.log(`Found post: ${chosenPost}`)

    // Post.findByIdAndDelete({ _id: chosenPostID}, (err) => {

    //     if (err) {
    //         console.log(err)
    //         throw new HttpError(err.message, 404)
    //     }

    //     res.status(200).json({ message: "Deleted post!" })
    // })

    const postToDelete = req.params.postID

    try {
        // post = await Post.findById(req.params.id)
        // post.remove()

        

    } catch(err) {
        console.log(err)
        const error = new HttpError(
            "Something went wrong, could not delete post.", 500
        )

        return next(error)
    }


    res.status(200).json({ message: "Deleted post."})
}

exports.createPost = createPost
exports.editPost = editPost
exports.addLike = addLike
exports.removeLike = removeLike
exports.addComment = addComment
exports.deleteComment = deleteComment
exports.deletePost = deletePost