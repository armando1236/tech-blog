const router = require('express').Router();
const { Comment, User, Post } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('sequelize')


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include:[User]
    });

    const posts = postData.map((posts) => posts.get({ plain: true }));
console.log(posts);
    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const singlePostData = await Post.findByPk(req.params.id,{
      include: [
        User, 
        { 
          model: Comment,
          include: [User]
        }
      ]
    })
  
   if(singlePostData){
     const singlePost = singlePostData.get({ plain:true})
     console.log(singlePost)
     res.render('single-post', singlePost)
     

   }


   
    
  } catch (err) {
    res.status(400).json(err);
  }
})


  

  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/homepage');
      return;
    }

    res.render('login');
  });

  module.exports = router;
