/* eslint linebreak-style: ["error", "windows"] */
const router = require('express').Router();
const auth = require('../middleware/auth');
const gifController = require('../controllers/gif');
const commentsController = require('../controllers/gifcomments');

router.post('/create', auth.verifyToken, gifController.createGif);
router.get('/', auth.verifyToken, gifController.getGifs);
router.get('/:id', auth.verifyToken, gifController.getSingleGif);
router.delete('/delete/:id', auth.verifyToken, gifController.deleteGif);
router.put('/update/:id', auth.verifyToken, gifController.updateGif);
router.post('/:postid/comment', auth.verifyToken, commentsController.createComment);
router.get('/:postid/comment', auth.verifyToken, commentsController.getComments);
router.put('/:postid/comment/:commentid', auth.verifyToken, commentsController.updateComment);
router.delete('/:postid/comment/:commentid', auth.verifyToken, commentsController.deleteComment);

module.exports = router;
