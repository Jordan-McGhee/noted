const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    image: { type: String, required: true},
    friends: Array,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
})

// model function requires 2 arguments:
// 1) the name of the schema — it creates the name of the collection when used. Makes it all lowercase and plural (i.e. users)
// 2) the Schema we created above
module.exports = mongoose.model('User', userSchema)