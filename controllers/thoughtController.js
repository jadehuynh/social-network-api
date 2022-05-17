const { Thoughts } = require('../models');

module.exports = {
  // Get all thought
  getThought(req, res) {
    Thoughts.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { thoughtText: req.body.thoughtText }, 
        { new : true}
    )
    .then((thought) => res.json(thought))
    .catch((e) => res.status(500).json(e))
    }, 
  // Delete a thought
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID to delete' })
          : res.status(200).json({ message: 'Thought deleted' })
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
};
