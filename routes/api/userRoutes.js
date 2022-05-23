const router = require('express').Router();
const {
    getUsers, 
    getSingleUser,
    createUser, 
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController')


router.route('/').get(getUsers).post(createUser); 

router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

// router.route('/:userId/friend/:friendId').put(addFriend).delete(removeFriend)
router.route('/:id/addfriend/:friendId').put(addFriend)
router.route('/:id/removefriend/:friendId').put(removeFriend)
module.exports = router;