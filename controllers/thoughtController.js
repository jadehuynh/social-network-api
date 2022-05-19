const { ObjectId } = require('mongoose').Types; 
const User = require('../models/User');
const Thoughts = require('../models/Thoughts')

module.exports = {
    getThoughts(req, res) {
        Thoughts.find()
        .then((thoughts) => res.json(thoughts))
        .catch((e) => res.status(500).json(e))
    },
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId})
        .select('-__v')
        .then((thoughts) => 
        !thoughts 
        ? res.status(404).json({message: 'Nothing with that id.'})
        : res.json(thoughts)
        )
        .catch((e) => res.status(500).json(e));
    },
    createThought(req, res) {
        Thoughts.create(req.body)
        //   console.log(req.body)
        .then((thoughts) => {
      return  User.findOneAndUpdate(
                { _id: req.params.userId},
                { $addToSet: { thoughts: thoughts._id }},
                { new : true}
            );
        })
        .then((thoughts) => 
            !thoughts
                ? res.status(404).json({ message : 'No user with this id.'})
                : res.json(thoughts)
        )
        .catch((e) => {
            return res.status(500).json(e)
        })
    }, 
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { thoughtText: req.body.thoughtText }, 
            { new : true}
        )
        .then((thoughts) => res.json(thoughts))
        .catch((e) => res.status(500).json(e))
        }, 
    deleteThought(req, res) {
        Thoughts.findOneAndRemove( {_id : req.params.thoughtId})
        .then((thoughts) => 
        !thoughts
        ? res.status(404).json({ message: 'No thought available.'})
        : res.status(200).json({ message: 'Thought Deleted'})
        )
        .catch((e) => res.status(500).json(e))
    }

}