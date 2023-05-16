const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { signUp, signIn } = require('../controllers/sign');
const auth = require('../middlewares/auth');
const users = require('./users');
const NotFoundError = require('../errors/NotFoudError');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
}), signUp);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), signIn);

router.use('/users', auth, users);

router.use(auth, (req, res, next) => {
  next(new NotFoundError('Page Not Found'));
});

module.exports = router;