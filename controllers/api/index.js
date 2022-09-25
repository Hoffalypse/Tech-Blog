const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const commentRoutes = require('./comment-routes.js');
const reviewRoutes = require('./review-routes.js');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/reviews', reviewRoutes);


module.exports = router;