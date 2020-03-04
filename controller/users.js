const User = require('../models/users')

module.exports = {
    index
}

function index(req, res){
    res.render('index', {
        user: req.user,
        title: 'Home',
    })
}