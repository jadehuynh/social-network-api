const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId}, 
            { $addToSet: { reactions: req.body }},
            { new: true }
        )
        .then((reaction) => res.json(reaction))
        .catch((e) => res.status(500).json(e))
    }, 
    removeReaction(req, res) { 
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: {reactions: {reactionId: req.params.reactionId} }},
            {new : true}
        )
        .then(() => res.status(200).json({ message : 'Reaction Removed'}))
        .catch((e) => res.status(500).json(e))
    }
}