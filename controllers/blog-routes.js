const router = require('express').Router();
const sequelize = require('../config/connection');
const USER = require('../models/user');


router.get('/', async (req, res) => {
  try{
  
  res.render('all');
    }
     catch (err) {
        res.status(500).json("show this");

      }
    }
);


router.get('/login', (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  res.render('login');
});

router.get('/signup', (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  res.render('signup');
});
router.get('/dashboard', (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  res.render('dashboard');
});

module.exports = router;
