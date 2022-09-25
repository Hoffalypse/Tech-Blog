const router = require('express').Router();
const { Review, Comment } = require('../../models');



//----------------at api/comments
router.get('/', async (req, res) => {
    
    try {
    const catPro = await Comment.findAll({
      include: [{ model: Review }],
    })
      res.json(catPro);
    }
    catch(err) {
      res.status(500).json(err);
    }
  });
  router.post('/', async (req, res) => {
   
    try{ 
      
    const comment = await Comment.create({ 
      comment_text: req.body.comment_text,
      review_id: req.body.review_id,
      user_id: req.session.user_id
    })

      const renderReview = comment.get({ plain: true });
      const dude = JSON.stringify(renderReview)
      
        res.status(200).json(comment);
      
      }catch(err)  {
       
        res.status(400).json(err);
      };
    })

    router.delete('/:id', (req, res) => {
    Comment.destroy({
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