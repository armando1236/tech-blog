const router = require('express').Router();
const { Theater, User, Review } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('sequelize')


router.get('/', async (req, res) => {
  try {
    const theaterData = await Theater.findAll({
    });

    const theater = theaterData.map((theater) => theater.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      theater,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/theaters', async (req, res) => {
  try {
    const theaterAvgs = await Theater.findAll({
      include: [{
        model: Review,
        attributes: [
          [sequelize.literal(
            '(SELECT AVG(seatingrating) FROM review)'
          ),
            'avgSeatingRating'
          ],
          [sequelize.literal(
            '(SELECT AVG(concessionsrating) FROM review)'
          ),
            'avgConcessionsRating'
          ],
          [sequelize.literal(
            '(SELECT AVG(audiorating) FROM review)'
          ),
            'avgAudioRating'
          ],
          [sequelize.literal(
            '(SELECT AVG(videorating) FROM review)'
          ),
            'avgVideoRating'
          ],
          [sequelize.literal(
            '(SELECT AVG(parkingrating) FROM review)'
          ),
            'avgParkingRating'
          ],
          [sequelize.literal(
            '(SELECT AVG(servicerating) FROM review)'
          ),
            'avgServiceRating'
          ],
          [sequelize.literal(
            '(SELECT AVG(crowdrating) FROM review)'
          ),
            'avgCrowdRating'
          ],
          [sequelize.literal(
            '(SELECT AVG(crowdrating + servicerating + parkingrating + videorating + audiorating + concessionsrating + seatingrating)/7 FROM review)'
          ),
            'masterRating'
          ],
        ]
      }]
    });
    const theaters = theaterAvgs.map(theater => theater.get({ plain: true }))
    res.render('theaters', {
      theaters,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/theater/:id', async (req, res) => {
  try {
    // const reviewsRender = await Review.findAll({
    //     where: {
    //         theater_id: req.params.id
    //     },
    //     plain: true,
    //     })
    //     console.log('Reviews Start Here')
    //     console.log('--------------------------------------')
    //     console.log(req.params.id)
    const ratingAvgs = await Review.findAll({
      where: {
        theater_id: req.params.id,
      },
      plain: true,
      include: [{
        model: Theater, include: [Review]}
      ],
      attributes: [
        [sequelize.literal(
          '(SELECT AVG(seatingrating) FROM review)'
        ),
          'avgSeatingRating'
        ],
        [sequelize.literal(
          '(SELECT AVG(concessionsrating) FROM review)'
        ),
          'avgConcessionsRating'
        ],
        [sequelize.literal(
          '(SELECT AVG(audiorating) FROM review)'
        ),
          'avgAudioRating'
        ],
        [sequelize.literal(
          '(SELECT AVG(videorating) FROM review)'
        ),
          'avgVideoRating'
        ],
        [sequelize.literal(
          '(SELECT AVG(parkingrating) FROM review)'
        ),
          'avgParkingRating'
        ],
        [sequelize.literal(
          '(SELECT AVG(servicerating) FROM review)'
        ),
          'avgServiceRating'
        ],
        [sequelize.literal(
          '(SELECT AVG(crowdrating) FROM review)'
        ),
          'avgCrowdRating'
        ],
        [sequelize.literal(
          '(SELECT AVG(crowdrating + servicerating + parkingrating + videorating + audiorating + concessionsrating + seatingrating)/7 FROM review)'
        ),
          'masterRating'
        ],
      ]
    })
    // const reviews = Review.findAll({
    //   where: {
    //     theater_id: req.params.id,
    //   },
    // })
    // console.log(reviews)
    const ratingsPlain = ratingAvgs.get({ plain: true })
    console.log(ratingsPlain);
    res.render('theater',
      ratingsPlain,
      // reviews
    );
    
  } catch (err) {
    res.status(400).json(err);
  }
})


  router.get('/homepage', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        // attributes: { exclude: ['password'] },
        // include: [{ model: Theater }],
      });

      const user = userData.get({ plain: true });

      res.render('homepage', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/homepage');
      return;
    }

    res.render('login');
  });

  module.exports = router;
