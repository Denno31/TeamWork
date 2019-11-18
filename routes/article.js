/* eslint linebreak-style: ["error", "windows"] */
const router = require('express').Router();
const auth = require('../middleware/auth');
const articleController = require('../controllers/article');

router.post('/create', auth.verifyToken, articleController.createArticle);
router.get('/', auth.verifyToken, articleController.getAllArticles);
router.get('/:id', auth.verifyToken, articleController.singleArticle);
router.delete('/delete/:id', auth.verifyToken, articleController.deleteArticle);
router.put('/edit/:id', auth.verifyToken, articleController.updateArticle);

module.exports = router;
