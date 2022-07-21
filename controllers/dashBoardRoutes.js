const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        where:{title: req.body.title,
             content:req.body.content}
      });
  
      const posts = postData.map((posts) => posts.get({ plain: true }));
  console.log(posts);
      // Pass serialized data and session flag into template
      res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });