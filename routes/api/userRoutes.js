const router = require('express').Router();
const {
    getUser, 
    getSingleUser,
    createUser, 
    updateUser,
    deleteUser
} = require('../../controllers/userController')


router.route('/').post(createUser); 

router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

// router.route('/:userId/friend/:friendId').put(addFriend).delete(removeFriend)

module.exports = router;