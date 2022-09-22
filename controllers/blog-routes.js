const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Review, Comment } = require('../models');



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

router.get('/dashboard', (req, res) => {
  Review.findAll({
          where: {
              user_id: req.session.user_id
          },
          attributes: [
              'id',
              'title',
              'content',
              'created_at'
          ],
          include: [{
             model: Comment,
            attributes: ['id', 'comment_text', 'review_id', 'user_id', 'created_at'],
            include: {
                     model: User,
                      attributes: ['username']
                  }
              },
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(reviewData => {
          const reviews = reviewData.map(post => post.get({ plain: true }));
          res.render('dashboard', { reviews, loggedIn: true });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;
