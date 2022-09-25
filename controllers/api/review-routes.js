const router = require('express').Router();
const { User, Review } = require('../../models');
const withAuth = require("../../utils/auth");

//-----------------/api/reviews---------------------------
router.get('/', withAuth, (req, res) => {
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
//update review route
  router.put('/:id', (req, res) => {
    console.log(req.body.content);
    Review.update (
      {
        title: req.body.title,
        content: req.body.content
      },
      {
        where: {
          id: req.params.id
        },
      }
    )
      .then((updatedRev) => {
      
        res.json(updatedRev);
      })
      .catch((err) => res.json(err));
  });
module.exports = router;

