    
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');


router.post('/create', (req, res, next) => {
	User.find({
        name : req.body.name
    })
    .exec()
    .then(result => {
        if (result.length > 0)
        {
            res.status(400).json({
                status: false,
                result: "User already exists."
            });
        }
        else
        {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name : req.body.name,
                score : 0
            });
        
            user
            .save()
            .then(result => {
                res.status(200).json({
                    status: true,
                    result: "User created."
                });
            })
            .catch(err => {
                res.status(500).json({
                    status: false,
                    result: err
                });
            });
        }
        
    })
    .catch(err => {
        res.status(500).json({
            status: false,
            result: err
        });
    });

   


});

router.post('/update', (req, res, next) => {
    const addition = req.body.score;

    User.findOneAndUpdate({ name : req.body.name}, { score : addition}, { new : true, runValidators : true})
    .then(reslt => {
        res.status(200).json({
            status: true,
            result : reslt
        });
    })
    .catch(err => {
        res.status(500).json({
            status: false,
            result: err
        });
    });
});

module.exports = router;