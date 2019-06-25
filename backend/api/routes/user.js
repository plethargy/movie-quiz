    
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');


router.get('/', (req, res, next) => {
    User
    .find()
    .then(data => {
        let arr = data.sort((a, b) => {
            return a.score < b.score; //sort in descending order
        })
        .slice(0, 25);

        res.status(200).json({
            status: true,
            result: arr
        });
    })
    .catch(err => {
        res.status(500).json({
            status: false,
            result: err
        });
    });
});

router.post('/', (req, res, next) => {
    User
    .find()
    .then(data => {
        let arr = data.sort((a, b) => {
            return a.score < b.score; //sort in descending order
        })
        .slice(0, 25);

        res.status(200).json({
            status: true,
            result: arr
        });
    })
    .catch(err => {
        res.status(500).json({
            status: false,
            result: err
        });
    });
});

router.post('/login', (req, res, next) => {
    User.find({
        name : req.body.name
    })
    .exec()
    .then(data => {
        if (data.length > 0)
        {
            if (bcrypt.compareSync(req.body.password, data[0].password))
            {
                res.status(200).json({
                    status: true,
                    result: data[0]
                });
            }
            else
            {
                res.status(200).json({
                    status: false,
                    result: "User not authenticated."
                });
            }
        }
        else
        {
            res.status(200).json({
                status: false,
                result: "User does not exist."
            });
        }
    });
});

router.post('/create', (req, res, next) => {
	User.find({
        name : req.body.name
    })
    .exec()
    .then(data => {
        if (data.length > 0)
        {
            res.status(200).json({
                status: false,
                result: "User already exists."
            });
        }
        else
        {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name : req.body.name,
                password: hash,
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

    User.find({
        name : req.body.name //finds user
    })
    .exec()
    .then(result => {
        if (result[0].score < addition) //checking if score needs to be updated
        {
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
        }
        else
        {
            res.status(200).json({
                status: true,
                result: "User already has a higher score."
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

module.exports = router;