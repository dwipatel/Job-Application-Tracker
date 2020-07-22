const router = require('express').Router();
const jwt = require('jsonwebtoken')
let User = require('../models/users.model');
const { model } = require('mongoose');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(404).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const password_confirmation = req.body.password_confirmation;
    //create new user
    const newUser = new User(
        {
            username, 
            password,
            password_confirmation,
        });
    //new user is saved to data base using save method
    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/login').post( async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username });
    if (!user) return res.status(400).json({ msg: "No account with this username registered" })

    const isMatch = (password === user.password) ? true : false;
    if(!isMatch) return res.status(400).json({ msg: "Invalid credentials"})

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({
        token,
        user: {
            id: user._id,
            username: user.username,
        }
    });

    
    
})

module.exports = router;