const { ObjectId } = require('mongoose').Types; 
const User = require('../models/User');
const Thought = require('../models/Thought')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((e) => res.status(500).json(e))
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) => 
        !thought 
        ? res.status(404).json({message: 'No thought with that id.'})
        : res.json(thought)
        )
        .catch((e) => res.status(500).json(e));
    },
    createThought(req, res) {
        Thought.create(req.body)
        //   console.log(req.body)
        .then((thought) => {
      return  User.findOneAndUpdate(
                { _id: req.params.userId},
                { $addToSet: { thoughts: thought._id }},
                { new : true}
            );
        })
        .then((thought) => 
            !thought
                ? res.status(404).json({ message : 'No user with this id. Cannot create thought.'})
                : res.json(thought)
        )
        .catch((e) => {
            return res.status(500).json(e)
        })
    }, 
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { thoughtText: req.body.thoughtText }, 
            { new : true}
        )
        .then((thought) => res.json(thought))
        .catch((e) => res.status(500).json(e))
        }, 
    deleteThought(req, res) {
        Thought.findOneAndRemove( {_id : req.params.thoughtId})
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought with this ID to delete on'})
        : res.status(200).json({ message: 'Thought Deleted'})
        )
        .catch((e) => res.status(500).json(e))
    }

}