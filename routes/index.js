var router = require('express').Router();
const passport = require('passport');

// Get Home Page 
router.get('/', function (req, res, next) {
  console.log(req.user)
  if (req.user && req.user.email == process.env.ADMINEMAIL) {
    req.user.isAdmin = true
    res.render('index', { user: req.user })
  } else if (req.user) {
    req.user.isAdmin = false
    res.render('index', { user: req.user })
  } else {
    res.render('index')
  }
});

// Login Route
router.get('/auth/google', passport.authenticate(
  'google', //strategy that we are using
  { scope: ['profile', 'email'] } //object that contains our scope
))

// OAuth to callback route (exact same as google URI)
// user is leaving the domain and tell google what our domain is 
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: `/`,
    failureRedirect: 'error'
  }
))

// Logout Route
router.get('/logout', function (req, res) {
  req.logout(function (err) {
    res.redirect('/')
  })
})

module.exports = router;
