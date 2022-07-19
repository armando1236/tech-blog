const router = require('express').Router();
const { response } = require('express');
const res = require('express/lib/response');
const sequelize = require('sequelize')
const { User, Post } = require('../../models');
const { getAttributes } = require('../../models/User');
const withAuth = require('../../utils/auth');

// /api/theater/13

router.get('/:id', async (req, res) => {
    try {
        const postRender = await Post.findAll({
            where: {
                user_id: req.params.id
            },
            plain: true,
            })

            // console.log('Post Starts Here')
            // res.json(postRender)
            // console.log('--------------------------------------')
            // console.log(req.params.id)}
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'content',  'post_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ]
        });
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
        router.post('/:id', withAuth, async (req, res)=>{
            try{
                console.log(req.body);
                const newPost = await Post.create({
                    ...req.body,
                    title: req.body.title,
                    content: req.body.content,
                    user_id: req.session.user_id,
                });

                res.status(200).json(newReview);
            } catch (err) {
                console.log(err);
                res.status(400).json(err);
            }
        });

        router.delete('/:id', withAuth, async (req, res) => {
            try{
                const postData = await Post.destroy({
                    where: {
                        id: req.params.id,
                        user_id: req.session.user_id,
                    }
                });
                if (!postData) {
                    res.status(400).json({ message: 'This post cannot be deleted'});
                    return;
                }
                res.status(200).json(postData);
            } catch (err) {
                res.status(500).json(err);
            }
            
        });
        
module.exports = router;