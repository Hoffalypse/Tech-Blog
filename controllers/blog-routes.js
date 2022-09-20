const router = require('express').Router();
const sequelize = require('../config/connection');
const User = require('../models/user');


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

// router.post('/logout', (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });
module.exports = router;
