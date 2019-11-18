/* eslint linebreak-style: ["error", "windows"] */
const router = require('express').Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', auth.verifyTokenIsAdmin, userController.signUp);
router.post('/login', userController.login);
router.delete('/delete/:id', auth.verifyTokenIsAdmin, userController.delete);
router.put('/update/:id', auth.verifyToken, userController.update);

module.exports = router;
