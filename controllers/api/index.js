const router = require('express').Router();
const userRoutes = require('./userRoutes');
const theaterRoutes = require('./theaterRoutes');
const reviewRoutes = require('./reviews');


router.use('/users', userRoutes);
router.use('/theaters', theaterRoutes);
router.use('/reviews', reviewRoutes);


module.exports = router;
