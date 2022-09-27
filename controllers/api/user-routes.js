const router = require('express').Router();
const { User, Review } = require('../../models');

// ---------------------at api/users----------------------------
//basic get route
router.get('/', (req, res) => {
  User.findAll({
          include: {model:Review}
      })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          
          res.status(500).json(err);
      });
});
//signup new account 
router.post('/signup', async (req, res) => {

  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
   
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    
    res.status(500).json("what is this ");
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
        
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    const validPassword = await dbUserData.checkPassword(req.body.password);
    
    if (!validPassword) {
      res
        .status(422)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      res
        .status(200)
        
        .json({ user: dbUserData, message: 'You are now logged in!' });
        
    });
  } catch (err) {
    
    res.status(500).json("further down error");
  }
});
router.delete('/:id', (req, res) => {

  User.destroy({
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