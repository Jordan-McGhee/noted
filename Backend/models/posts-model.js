const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    content: { type: String, required: true},
    comments: Array,
    usersThatLikeThisPost: Array
})

// model function requires 2 arguments:
// 1) the name of the schema — it creates the name of the collection when used. Makes it all lowercase and plural (i.e. users)
// 2) the Schema we created above
module.exports = mongoose.model('Post', postSchema)