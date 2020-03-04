const User = require('../models/users')

module.exports = {
    index
}

function index(req, res){
    console.log(req.user)
    res.render('index', {
        user: req.user,
        title: 'Home',
    })
}