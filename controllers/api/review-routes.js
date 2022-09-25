const router = require('express').Router();
const { User, Review, Comment } = require('../../models');
const withAuth = require("../../utils/auth");

//-----------------/api/reviews---------------------------
router.get('/', (req, res) => {
    Review.findAll({
            include: {model: User}
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            
            res.status(500).json(err);
        });
  });
  router.post('/',  withAuth, async (req, res) => {
    try {
   
      const newReview = await Review.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });

      res.status(200).json(newReview);
    } catch (err) {
      res.status(420).json(err);
    }
  });
  router.delete('/:id', (req, res) => {
    Review.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deleted) => {
        res.json(deleted);
      })
      .catch((err) => res.json(err));
  });
module.exports = router;

