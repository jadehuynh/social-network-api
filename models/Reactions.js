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




// reactionsSchema.virtual("reactionCount").get(function () {
//     return this.reactions.length
// })

const Reactions = model("Reactions", reactionsSchema)
module.exports = Reactions;