const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Review, Comment } = require('../models');


router.get('/', async (req, res) => {
  try {
   
    const dbReviewData = await Review.findAll({
    
      include: [
        {
          model: User,
          attributes: ['user_name'], 
        },
      ],
  });
    const renderReview = dbReviewData.map((one) =>
      one.get({ plain: true })
    );
    res.render('all',{renderReview});
    }
     catch (err) {
        res.status(500).json("show this");

      }
    }
);

router.get('/comment:id', async (req, res) => {
  try {
    
    const addComment = await Review.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
        
        },
        {
          model: User,
          attributes: ['user_name'], 
        },
      ],
    });
    const review = addComment.get({ plain: true });
    console.log(review);
    res.render('comment', {review});
    }
     catch (err) {
        res.status(500).json("comment screen error");

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
