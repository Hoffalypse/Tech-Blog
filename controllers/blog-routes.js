const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Review, Comment } = require('../models');
const { findAll } = require('../models/User');


router.get('/', async (req, res) => {
  try {
   
    const dbReviewData = await Review.findAll({
    
      include: [
        {
          model: User,
          attributes: ['username'], 
        },
      ],
  });
    const renderReview = dbReviewData.map((one) =>
      one.get({ plain: true })
    );
    res.render('all',{renderReview, loggedIn: req.session.loggedIn});
    }
     catch (err) {
        res.status(500).json("show this");

      }
    }
);

//get one post for comment page 
router.get('/comment/:id', async (req, res) => {
  
  if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
    }
  try {
    
    const addComment = await Review.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'], 
        },
        {
          model: Comment,
            include: [{model: User, attributes: ['username']}]
        },
      ],
    });
    const review = addComment.get({ plain: true });
   
    res.render('comment', {review});
    }
     catch (err) {
        res.status(500).json("comment screen error");
      }
    }
);

//main page link
router.get('/login', (req, res) => {
  
  res.render('login');
});

router.get('/signup', (req, res) => {
 
  res.render('signup');
});

router.get('/dashboard', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
}
try{
const userReview = await Review.findAll({
  where: { 
    user_id : req.session.user_id
  }
})
const renderReview = dbReviewData.map((one) =>
      one.get({ plain: true }))
  res.render('dashboard',userReview)

} catch (err){

  res.status(500).json(err);
}
}),
//logout... ends the session
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(424).end();
  }
});
module.exports = router;
