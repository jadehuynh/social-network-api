const { Reactions } = require('../models');

module.exports = {
  // Get all reactions
  getReation(req, res) {
    Reactions.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single reaction
  getSingleReaction(req, res) {
    Reactions.findOne({ _id: req.params.reactionsId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No reaction with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a reaction
  deleteReaction(req, res) {
    Reactions.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No reaction with that ID to delete' })
          : res.status(200).json({ message: 'Reaction deleted' })
      )
      .then(() => res.json({ message: 'Reaction deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
};
