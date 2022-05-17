const { Schema, model } = require('mongoose')

const thoughtsSchema = new Schema (
    {
        thoughtText: {
            type:String,
            require:true,
            min:1,
            max:280,
        },
        createdAt: {
            type:Date,
            default:Date.now,
        },
        username: {
            type:String,
            require:true,
        },
        reactions: [{
            type:Schema.Types.ObjectId,
            ref: "reactions",
        }],
    },
    {
        toJSON:{
            virtuals:true,
            getters:true,
        },
        id:false,
    }
)


thoughtsSchema.virtual("reactionCount").get(function () {
    return this.reaction.length
})

const Thoughts = model("Thoughts", thoughtsSchema)
module.exports = Thoughts;