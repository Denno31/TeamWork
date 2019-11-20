/* eslint linebreak-style: ["error", "windows"] */
const router = require('express').Router();
const auth = require('../middleware/auth');
const articleController = require('../controllers/article');
const commentsController = require('../controllers/comment');

router.post('/create', auth.verifyToken, articleController.createArticle);
router.get('/', auth.verifyToken, articleController.getAllArticles);
router.get('/:id', auth.verifyToken, articleController.singleArticle);
router.delete('/delete/:id', auth.verifyToken, articleController.deleteArticle);
router.put('/edit/:id', auth.verifyToken, articleController.updateArticle);
router.post('/:postid/comment', auth.verifyToken, commentsController.createComment);
router.get('/:postid/comment', auth.verifyToken, commentsController.getComments);
router.put('/:postid/comment/:commentid', auth.verifyToken, commentsController.updateComment);
router.delete('/:postid/comment/:commentid', auth.verifyToken, commentsController.deleteComment);

module.exports = router;
