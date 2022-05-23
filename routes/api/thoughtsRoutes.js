const router = require('express').Router();
const {
    getThoughts, 
    getSingleThought,
    createThought,
    updateThought, 
    deleteThought,
    addReaction, 
    removeReaction
} = require('../../controllers/thoughtController');


router.route('/').get(getThoughts)

router.route('/:userId').post(createThought)

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

router.route('/:thoughtId/user/:userId').put(updateThought);

router.route('/:thoughtId/reactions').put(addReaction);

router.route('/:thoughtId/reactions/:reactionId').put(removeReaction);
// router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);
module.exports = router;