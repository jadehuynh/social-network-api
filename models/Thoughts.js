const { Schema, model, Types } = require('mongoose')

const reactionsSchema = new Schema (
    {
        reactionId: {
            type:Schema.Types.ObjectId,
            default:() => new Types.ObjectId(),
        },
        reactionBody: {
            type:String,
            required:true,
            max:280,
        },
        username: {
            type:String,
            require:true,
        },
        createdAt: {
            type:Date,
            default:Date.now,
        },
    },
    {
        toJSON:{
            virtuals:true,
            getters:true,
        },
        id:false,
    }
)

const thoughtsSchema = new Schema (
    {
        thoughtText: {
            type:String,
            required:true,
            min:1,
            max:280,
        },
        createdAt: {
            type:Date,
            default:Date.now,
        },
        username: [{
            type:String,
            required:true,
            ref: 'User',
        }],
        reactions: [reactionsSchema],
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
    return this.reactions.length
})

const Thoughts = model("Thoughts", thoughtsSchema)
module.exports = Thoughts;
