const router = require('express').Router();
const { signUp, signIn } = require('../controllers/sign');
const auth = require('../middlewares/auth');
const users = require('./users');

router.post('/signup', signUp);
router.post('/signin', signIn);

router.use('/users', auth, users);

module.exports = router;