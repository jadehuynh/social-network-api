const { User } = require('../models');

const userController = {
  // Get all users
  getUsers(req, res) {
    User.find()
  
    .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .populate({path: "Thoughts", select:"-__v"})
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body}, 
        { new : true}
        )
    .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user with this id to update.'})
            : res.json(user)
        )
    .catch((e) => res.status(500).json(e))
}, 
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thoughts.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
