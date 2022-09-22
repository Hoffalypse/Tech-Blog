const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const commentRoutes = require('./comment-routes.js');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
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

module.exports = router;