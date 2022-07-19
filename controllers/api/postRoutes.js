const router = require('express').Router();
const { response } = require('express');
const sequelize = require('sequelize')
const { User, Post } = require('../../models');
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
            console.log('Post Starts Here')
            res.json(postRender)
            console.log('--------------------------------------')
            console.log(req.params.id)}
        // const ratingAvgs = await Review.findAll({
        //     where: {
        //         theater_id: req.params.id,
        //     },
        //     plain: true,
        //     attributes: [
        //         [sequelize.literal(
        //             '(SELECT AVG(seatingrating) FROM review)'
        //         ),
        //             'avgSeatingRating'
        //         ],
        //         [sequelize.literal(
        //             '(SELECT AVG(concessionsrating) FROM review)'
        //         ),
        //             'avgConcessionsRating'
        //         ],
        //         [sequelize.literal(
        //             '(SELECT AVG(audiorating) FROM review)'
        //         ),
        //             'avgAudioRating'
        //         ],
        //         [sequelize.literal(
        //             '(SELECT AVG(videorating) FROM review)'
        //         ),
        //             'avgVideoRating'
        //         ],
        //         [sequelize.literal(
        //             '(SELECT AVG(parkingrating) FROM review)'
        //         ),
        //             'avgParkingRating'
        //         ],
        //         [sequelize.literal(
        //             '(SELECT AVG(servicerating) FROM review)'
        //         ),
        //             'avgServiceRating'
        //         ],
        //         [sequelize.literal(
        //             '(SELECT AVG(crowdrating) FROM review)'
        //         ),
        //             'avgCrowdRating'
        //         ],
        //         [sequelize.literal(
        //             '(SELECT AVG(crowdrating + servicerating + parkingrating + videorating + audiorating + concessionsrating + seatingrating)/7 FROM review)'
        //         ),
        //             'masterRating'
        //         ],
//             ]
//         })
//     } catch (err) {
//         res.status(400).json(err);
//     }
// })



module.exports = router;