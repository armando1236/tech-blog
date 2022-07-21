
const router = require('express').Router();
const { response } = require('express');
const sequelize = require('sequelize')
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// /theater/1
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        console.log(newComment);

        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});
// router.get('/:id', async (req, res) => {
//     try {
//         // Get all projects and JOIN with user data
//         const reviewData = await Review.findAll({
//             where: {
//                 theater_id: req.params.id
//             },
//         });

//         // Serialize data so the template can read it
//         const reviews = reviewData.map((Review) => Review.get({ plain: true }));

//         // Pass serialized data and session flag into template
//         res.render('reviews', {
//             reviews
//             // logged_in: req.session.logged_in 
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });



router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'This comment cannot be deleted' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router; 