const router = require('express').Router();



const { User, Post } = require('../../models');

const withAuth = require('../../utils/auth');

// /api/theater/13


        router.post('/', withAuth, async (req, res)=>{
            try{
                console.log(req.body);
                // const newPost = await Post.create({
                //     title: req.body.title,
                //     content: req.body.content,
                //     user_id: req.session.user_id,
                // });

                // res.status(200).json(newPost);
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });

        router.delete('/:id', withAuth, async (req, res) => {
            try{
                const postData = await Post.destroy({
                    where: {
                        id: req.params.id,
                       
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

        router.put('/:id', withAuth, async (req, res) => {
            try{
                const postData = await Post.update(
                    req.body,
                    {where: {
                        id: req.params.id,
                       
                    }
                }
                );
                if (postData.affectedRows>0) {
                    res.status(200).json(postData);
                    return;
                }else{
                res.status(400).json({ message: 'This post cannot be updated!'});}
            } catch (err) {
                res.status(500).json(err);
            }
            
        });
        
module.exports = router;