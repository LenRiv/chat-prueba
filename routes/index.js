const router = require('express').Router();

const User = require('../models/user.model');
const Message = require('../models/message.model');

router.get('/', (req, res) => {
  res.redirect('/chat')
})

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});


router.get('/chat', async (req, res) => {
  if (!req.cookies['chat_login']) return res.redirect('/login?error=true');

  const user = await User.findById(req.cookies['chat_login']);
  const messages = await Message.find().sort({ createdAt: -1 }).limit(5).populate('user');

  res.render('chat', { user, messages })
});


module.exports = router;