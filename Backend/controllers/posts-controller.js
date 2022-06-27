const HttpError = require("../models/http-error")
const { validationResult } = require("express-validator")
const mongoose = require("mongoose")

// Models
const User = require("../models/users-model")
const Post = require("../models/posts-model")
const Comment = require("../models/comments-model")

const createPost = async (req, res, next) => {

    // looks into req object and checks for any validation errors that were picked up. Returns an object
    const errors = validationResult(req)

    // check to see if there are any errors and throw error if so
    if (!errors.isEmpty()) {
        console.log(errors)
        throw new HttpError("Your post must be 5 characters or longer! Please try again.")
    }

    // use object destructuring to grab data from the incoming request body
    const { postCreator, content } = req.body

    // create an object with the values you need using post model
    const createdPost = new Post({
        postCreator, 
        content
    })

    // check if user exists before saving
    let user

    try {
        user = await User.findById(postCreator)
    } catch(err) {
        const error = new HttpError(
            "Creating post failed. Please try again!", 500
        )

        return next(error)
    }

    // if not, exit function and create a new error
    if (!user) {
        const error = new HttpError(
            "Could not find a user for the provided ID!", 404
        )

        return next(error)
    }

    // if there are no problems, save the post and add it to the user's posts with transactions/sessions

    try{
        // need to do multiple operations at once. If either fails, we want to cancel both and enter the catch block
        // do this with transactions and sessions
        // create the session and use the startTransaction method

        const session = await mongoose.startSession()
        session.startTransaction()

        // creates new post and creates unique id for it. Have to pass the current session
        await createdPost.save({ session: session })

        user.posts.push(createdPost)
        await user.save({ session: session })

        // close the session only if all the above was successful
        await session.commitTransaction()

    } catch (err) {
        const error = new HttpError(
            "Creating post failed. Please try again!", 500
        )

        console.log(err)

        return next(error)
    }
    

    res.status(201).json({ message: "Created post!", post: createdPost, user: user, userPosts: user.posts })
}

// ADD THESE LATER ONCE WE HAVE AUTHENTICATED USERS
const addLike = (req, res, next) => {

}

const removeLike = (req, res, next) => {

}

// ^^^^^^^^^^^^^^^^^^^^^^^^^


const addComment = async (req, res, next) => {
    // looks into req object and checks for any validation errors that were picked up. Returns an object
    const errors = validationResult(req)

    // check to see if there are any errors
    if (!errors.isEmpty()) {
        console.log(errors)
        throw new HttpError("Your post must be 5 characters or longer! Please try again.")
    }

    // grab post ID from url
    const postID = req.params.postID

    // variable to keep track of post that's being commented on
    let post

    // try to find that post by id
    try {
        post = await Post.findById(postID)
    } catch(err) {
        const error = new HttpError(
            "Creating comment failed. Please try again.", 500
        )

        return next(error)
    }

    // error if we can't find that post and exit out of the function
    if (!post) {
        const error = new HttpError(
            "Could not find this post!", 404
        )

        return next(error)
    }

    // object destructuring to grab data from request body
    const { commentCreator, content } = req.body

    // create new comment object with values from above
    const createdComment = new Comment({
        commentCreator,
        content,
        commentedPost: post
    })

    // check if user exists before saving
    let user

    try {
        user = await User.findById(commentCreator)
    } catch(err) {
        const error = new HttpError(
            "Creating post failed. Please try again!", 500
        )

        return next(error)
    }

    // if not, exit function and create a new error
    if (!user) {
        const error = new HttpError(
            "Could not find a user for the provided ID!", 404
        )

        return next(error)
    }

    // if there are no problems, save the comment, add it to the post's comment array

    try {
        // doing multiple operations at once, so need session/transaction to make sure all are successful before saving
        const session = await mongoose.startSession()
        session.startTransaction()

        await createdComment.save({ session: session })

        post.comments.push(createdComment)
        await post.save({ session: session })

        await session.commitTransaction()

    } catch (err) {

        const error = new HttpError(
            "Creating comment failed. Please try again!", 500
        )
        console.log(err)

        return next(error)
    }
    

    res.status(201).json({ message: "Added comment!", post: post, user: user, postComments: post.comments, comment: createdComment.message })
}

const deleteComment = async (req, res, next) => {
    // grab IDs from url
    const postID = req.params.postID
    const commentID = req.params.commentID

    // variables to keep track of the objects we query the DB for
    let post
    let comment

    // try/catch blocks to query for the objects
    try {
        post = await Post.findById(postID)
    } catch(err) {
        const error = new HttpError(
            "Something went wrong, couldn't find the post!", 500
        )

        return next(error)
    }

    try {
        comment = await Comment.findById(commentID)
    } catch(err) {
        const error = new HttpError(
            "Something went wrong, couldn't find the comment!", 500
        )

        return next(error)
    }

    // try/catch to run a session to delete the comment and save the associated post
    try {

        const session = await mongoose.startSession()
        session.startTransaction()

        await comment.remove({ session: session })

        post.comments.pull(comment)
        await post.save({ session: session })

        await session.commitTransaction()
    } catch (err) {
        const error = new HttpError(
            "Deleting comment failed. Please try again!", 500
        )

        return next(error)
    }

    res.status(200).json({ message: "Deleted comment!", post: post, postComments: post.comments })
}

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
            "Something went wrong. Could not find that post!", 500
        )
        return next(error)
    }
    
    post.content = content

    try {
        await post.save()
    } catch(err) {
        const error = new HttpError(
            "Something went wrong. Could not update post!", 500
        )
        return next(error)
    } 

    res.status(200).json({ post: post.toObject({ getters: true })})
}

const deletePost = async (req, res, next) => {
    const postID = req.params.postID

    let post

    try {
        // .populate() gives access to a document stored in another collection (i.e. User) and work with data in that collection since we have the ref attribute in the models
        // grab the appropriate property from our post model (postCreator) and mongoose will then search through the associated ID and give access to all of its data and allows us to change it
        post = await Post.findById(postID).populate('postCreator')
    } catch(err) {
        const error = new HttpError(
            "Something went wrong, could not delete post", 500
        )
        return next(error)
    }

    if (!post) {
        const error = new HttpError(
            "Could not find this post. Please try again!", 404
        )
        return next(error)
    }

    // similar to creating the post, we need a session/transactions that will commit only if both deleting the post and removing it from the user's array are successful
    try{

        const session = await mongoose.startSession()
        session.startTransaction()

        // removes post. Have to pass the current session
        await post.remove({ session: session })

        // need to remove the post from the user and save the updated user
        // can do these because populate gave us full user object linked to this post
        post.postCreator.posts.pull(post)
        await post.postCreator.save({ session: session })

        // close the session only if all the above was successful
        await session.commitTransaction()

    } catch (err) {
        const error = new HttpError(
            "Deleting post failed. Please try again!", 500
        )

        console.log(err)

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