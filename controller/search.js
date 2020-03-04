const Search = require('../models/search')
const Boards = require('../models/boards')
const Spotify = require('node-spotify-api');
const axios = require('axios')


module.exports = {
    form,
    playlists,
    tracks,
    create,
}

function form(req, res){
    // if(req.user){
        res.render('boards/form', {
            title: 'Form',
            user: req.user
        })
    // }else{
    //     res.redirect('/auth/google')
    // }
}

function playlists(req, res){
    if(req.user){
    const search = new Search(req.body)
    search.save(function(err){
        if(err) return
    })
    const spotify = new Spotify({
        id: '312576630448494695a7b8d3f89756f2',
        secret: 'ab5da3f1e7024822b5e522693815c85a'
      });
    spotify.search({ type: 'playlist', query: `${req.body.query}` }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    const playlists = []
    const push = data.playlists.items.forEach( p => {
        return playlists.push(p)
    })
    // console.log(req.body.query)
    let boards = []
    Boards.find({'tags.tags': req.body.query}, function(err, res){
        if(err) return 
        boards.push(res)
    })
    res.render('boards/', {
        query: req.body.query,
        playlists: playlists,
        title: 'Playlists',
        user: req.user,
        board: boards
    })
    })
    }else{
        res.redirect('/auth/google')
    }
}

function tracks(req, res){
    if(req.user){
    const spotify = new Spotify({
        id: '312576630448494695a7b8d3f89756f2',
        secret: 'ab5da3f1e7024822b5e522693815c85a'
      });
    spotify.search({ type: 'playlist', query: `${req.params.query}` }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    spotify.request(`https://api.spotify.com/v1/playlists/${req.params.id}/tracks`)
    .then(function(data) {
        let tracks = []
        data.items.forEach( t => {
            // console.log(t.track)
            tracks.push(t.track)

        })
        res.render('boards/tracks', {
            title: 'Tracks',
            user: req.user,
            tracks: tracks
        })
    })
    .catch(function(err) {
    console.error('Error occurred: ' + err); 
    });
    });
    }else{
        res.redirect('/auth/google')
    }
}

function create(req, res){
    req.body.tags = req.body.tags.split(",").map(function(tag) {
        return { "tags": tag };
    })
    const board = new Boards(req.body)
    console.log(req.body)
    board.save(function(err){
        if(err) return res.redirect('/boards/form')
        res.redirect('/boards/form')
    })
}