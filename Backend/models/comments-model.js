const mongoose = require("mongoose")

// need to change user to the correct type once users are added
const commentSchema = new mongoose.Schema({
    user: { type: String, required: true },
    post: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Post"
    },
    content: { type: String, required: true}
})

// model function requires 2 arguments:
// 1) the name of the schema — it creates the name of the collection when used. Makes it all lowercase and plural (i.e. users)
// 2) the Schema we created above
module.exports = mongoose.model('Comment', commentSchema)