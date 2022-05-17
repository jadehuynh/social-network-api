const router = require('express').Router();
const {
    getThought, 
    getSingleThought,
    createThought,
    updateThought, 
    deleteThought
} = require('../../controllers/thoughtController');

const {
    addReaction, 
    removeReaction
} = require('../../controllers/reactionController')

router.get('/').get(getThought);

// router.route('/:userId').post(createThought)

// router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// router.route('/:thoughtId/user/:userId').put(updateThought);

// router.route('/:thoughtId/reactions').put(addReaction);

// router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);
module.exports = router;