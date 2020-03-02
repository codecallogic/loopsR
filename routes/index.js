var express = require('express');
var router = express.Router();
var passport = require('passport')
var usersCtrl = require('../controller/users')

/* GET home page. */
router.get('/auth/google', passport.authenticate(
  'google',
  {scope: ['profile', 'email']}
))

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
))

router.get('/logout', function(req, res){
  req.logout()
  res.redirect('/')
})

router.get('/', usersCtrl.index);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
