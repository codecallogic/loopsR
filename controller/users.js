const User = require('../models/users')
const Boards = require('../models/boards')

module.exports = {
    index,
    dashboard,
    edit,
    update,
    deleteBoard,
    addComment
}

function index(req, res){
    // console.log(req.user)
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

function deleteBoard(req, res){
    Boards.deleteOne({_id: req.body.delete}, function(err){
        if (err) return res.redirect('/boards/dashboard')
        res.redirect('/boards/dashboard')
    })
}

function addComment(req, res){
    // console.log('Hello')
    // console.log(req.body)
    Boards.findById({_id: req.body.board}, function(err, board){
        // console.log(board)
        board.comments.push(req.body)
        board.save(function(err){
            res.redirect(`/boards/${board._id}/board`)
        })
    })
}