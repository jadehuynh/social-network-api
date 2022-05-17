const { Friends } = require('../models');

module.exports = {
  // Get all friends
  getFriend(req, res) {
    Friends.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single friend
  getSingleFriend(req, res) {
    Friends.findOne({ _id: req.params.friendsId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No friend with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a friend
  deleteFriend(req, res) {
    Friends.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No friend with that ID to delete' })
          : res.status(200).json({ message: 'Friend deleted' })
      )
      .then(() => res.json({ message: 'Friend deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
};
