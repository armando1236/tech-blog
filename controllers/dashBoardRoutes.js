const router = require('express').Router();
const {  Post } = require('../models');

router.get('/', async (req, res) => {
    console.log('working');
    console.log(req.session.user_id);
    try {
      const postData = await Post.findAll({
        where:{user_id:req.session.user_id}
      });
  console.log(postData);
      const posts = postData.map((post) => post.get({ plain: true }));
  console.log(posts.length);
      // Pass serialized data and session flag into template
      res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports=router;