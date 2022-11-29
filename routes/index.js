var router = require('express').Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

//Login Route
router.get('/auth/google', passport.authenticate(
  'google', //strategy that we are using
  { scope: ['profile', 'email'] } //object that contains our scope
))

//OAuth to callback route (exact same as google URI)
//user is leaving the domain and tell google what our domain is 
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: `/users/index`,
    failureRedirect: 'error'
  }
))

//Logout Route
router.get('/logout', function (req, res) {
  req.logout(function (err) {
    res.redirect('/')
  })
})

module.exports = router;
