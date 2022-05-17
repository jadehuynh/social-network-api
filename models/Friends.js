const { Schema, model } = require('mongoose')

const friendsSchema = new Schema (
    {
        toJSON:{
            virtuals:true,
            getters:true,
        },
        id:false,
    }
)


friendsSchema.virtual("friendCount").get(function () {
    return this.friends.length
})

const Friends = model("Friends", friendsSchema)
module.exports = Friends;
