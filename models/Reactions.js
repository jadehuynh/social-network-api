const { Schema, model, Types } = require('mongoose')

const reactionsSchema = new Schema (
    {
        reactionId: {
            type:Schema.Types.ObjectId,
            default:() => new Types.ObjectId(),
        },
        reactionBody
    }
)
