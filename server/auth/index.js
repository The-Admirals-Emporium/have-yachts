const router = require('express').Router();
const User = require('../db/models/user');
module.exports = router;

//get route to fetch your info
router.get('/me', async (req, res, next) => {
  try {
    if (req.user) {
      res.json(req.user);
    }
  } catch (error) {
    console.error(error);
  }
});

//put route for /login
router.put('login', async (req, res, next) => {
  try {
    const user = await User.findONe({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    if (!user) {
      const err = new Error('Incorrect email or password!');
      err.status = 401;
      throw err;
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
