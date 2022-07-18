const router = require('express').Router();
const { Comment, User, Post } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('sequelize')


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
    });

    const posts = postData.map((posts) => th.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const singlePost = await Post.findByPk({
      include: [
        User, 
        { 
          model: Comment,
          include: [User]
        }
      ]
    })
  
   
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
