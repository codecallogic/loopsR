const User = require('../models/users')
const Boards = require('../models/boards')

module.exports = {
    index,
    dashboard,
    edit,
    update
}

function index(req, res){
    res.render('index', {
        user: req.user,
        title: 'Home',
    })
}

function dashboard(req, res){
    Boards.find({'googleId': req.user.googleId}, function(err, boards){
        // console.log(boards)
        if(boards){
            res.render('boards/dashboard', {
                user: req.user,
                board: boards,
                title: 'Dashboard'
            })
        }
    })
}

function edit(req, res){
    Boards.find({'_id': req.params.id}, function(err, boards){
        let tags = [] 
        boards[0].tags.forEach( t => {tags.push(t.tags)})
        if(boards){
            res.render('boards/edit', {
                user: req.user,
                board: boards,
                tags: tags,
                title: 'Dashboard'
            })
        }
    })
}

function update(req, res){
    // console.log(req.params.id)
    req.body.googleId = req.user.googleId
    req.body.tags = req.body.tags.split(",").map(function(tag) {
        return { "tags": tag };
    })
    Boards.findByIdAndUpdate({_id: req.params.id}, req.body, function(err, boards) {
        res.redirect('/boards/dashboard')
    })
}