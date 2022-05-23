const Thought = require("../models/Thoughts");
const User = require("../models/User");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((e) => res.status(500).json(e));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select("-__v")
      .populate("Thoughts")
      .populate("Friends")
      .then((dbUser) =>
        !dbUser
          ? res.status(404).json({ message: "No user found." })
          : res.json(dbUser)
      )
      .catch((e) => res.json(e));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((e) => res.status(500).json(e));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with id." })
          : res.json(user)
      )
      .catch((e) => res.status(500).json(e));
  },
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id." })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "Successfully deleted." }))
      .catch((e) => res.status(500).json(e));
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          console.log("User not found");
        }
        res.json({ message: "Successfully added Friend." });
      })
      .catch((e) => res.status(500).json(e));
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          console.log("User not found");
        }
        res.json({ message: "Successfully deleted Friend." });
      })
      .catch((e) => res.status(500).json(e));
  }

};
