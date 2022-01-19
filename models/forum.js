//forum model

const mongoose = require('mongoose')
const forumSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        forumOwner: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            }
        ],
        comments:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag"
            }
        ],
        createdOn: {
            type: Date,
            default: Date.now
        }
    }
)

const Forum = mongoose.model('Forum', forumSchema)
module.exports = Forum