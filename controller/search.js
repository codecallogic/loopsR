const Search = require('../models/search')
const Spotify = require('node-spotify-api');
const axios = require('axios')


module.exports = {
    form,
    playlists,
    tracks,
    getPlaylists
}

function form(req, res){
    res.render('boards/form', {
        title: 'Form',
        user: req.user
    })
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
    res.render('boards/', {
        query: req.body.query,
        playlists: playlists,
        title: 'Playlists',
        user: req.user
    })
    })
    }else{
        res.redirect('/auth/google')
    }
}

function tracks(req, res){
    const spotify = new Spotify({
        id: '312576630448494695a7b8d3f89756f2',
        secret: 'ab5da3f1e7024822b5e522693815c85a'
      });
    //   ${req.params.query}
    spotify.search({ type: 'playlist', query: `${req.params.query}` }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    // ${req.params.id}
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
}

function getPlaylists(){
const user_id = 'jfg-taste'
const token = "Bearer BQDZw2WdGDKWOrlUFZVFz0UdZ8qknI5tqwieC3T2T0BT3gdzmRlwJ7jd7VzauWZryqIovv30KUT5k26hqG9quSxi_3r9axR0BI35kK9nsAT3HC_NdNv3iBvzKjKvz9VvMhSViQKeV6pF2Pus"
const playlistUrl = `https://api.spotify.com/v1/users/${user_id}/playlists`
request({url: playlistUrl, headers:{"Authorization":token}}, function(error, res){
    if (res){
        const playlists = JSON.parse(res.body);

        // console.log(JSON.stringify(playlists.items, null, " "))
        const array = playlists.items.forEach( (p, i) => {
            return console.log(p.name + i)
        })
        
        const playlistUrl = playlists.items[0].href
        // console.log(playlists)
        request({url: playlistUrl, headers:{"Authorization": token}}, function(error, res){
            if (res){
                const playlist = JSON.parse(res.body);
                console.log("playlist " + playlist.name)
                console.log("playlist " + playlist.href)
                playlist.tracks.items.forEach(function(track){
                    console.log(track.track.name)
                })
            }
        })
    }else{
        console.log(error)
    }
})
}

// client id: 312576630448494695a7b8d3f89756f2
// client secret: ab5da3f1e7024822b5e522693815c85a
// https%3A%2F%2Fcodecallogic.com%2F
// playlist-read-private
// Refresh_Token: AQDK71vjDQd1MZqASop8WBmyHfrkfxRF9s4pbPMFHXhS3PhkM6FCK0oaz6BTIiUEO_wMOVHk5r5SIxEfSKEhIY28WyZGtx7jYyZ0nN7eecskUdPZ1jrdq_1Fln90oPF4rsQ

// Access_Token: BQA2ZO7tlVWUI2UwawihV9AzT7syaRYZBAyN5dbTIP-kjGFxMA-Dl1nFCRFlJ8fqiW2fHsEgFawEAny5r6Ud0hff9XU7ApBnASbxR7w7BYWNTNkyE4og1mCvnUsuB2xe3xiMZoXci_t6Cq6h

// 312576630448494695a7b8d3f89756f2:ab5da3f1e7024822b5e522693815c85a

// {"access_token":"BQA_rylM6E3Os_At7MemCRBbFt0pzcfhRAm3UaJXspQVmdf3JSZ8b9BaAha9A97sc9szZXdp_fPjhNF-Vb3MASGh6rwafC3F4Ccy_DofQzXm0sVqJK_kI9uUAHgXYTah267XDGBmpmlzrzLq","token_type":"Bearer","expires_in":3600,"refresh_token":"AQCtczwrl0WZrwlnu6mwsxIgaR1Zb3WtZDjsuu_HKPfktm9r-SDYfLjUcPMsJKbSxIRILh9_8hTCUx-BX5L0hjljxQqrBRevm3_r5IzG9fxpEiQqkn9Q-PCYZ7NBCuK_lnY","scope":""}%   

// https://accounts.spotify.com/authorize?client_id=312576630448494695a7b8d3f89756f2&scopes=playlist-read-private&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fplaylist%2F

// curl -H "Authorization: Basic MzEyNTc2NjMwNDQ4NDk0Njk1YTdiOGQzZjg5NzU2ZjI6YWI1ZGEzZjFlNzAyNDgyMmI1ZTUyMjY5MzgxNWM4NWE=" -d grant_type=authorization_code -d code=AQA44LRVurvmAaHJRtCtjfHnZGrkN7H105OF3Uy_ZMjeOniEadLy3xLflJuIMo87WEw9KDus0mKS4sgh2DknVL3D87i3wbUuO2UTbw-hxMFO0b0FCcHrW4gbAyZH3mNKu--_Kg3LRi8DX0tGK4bYto_NWJO4_zE4sGiLH_psyMjfjPIwqPsWDjCG1dI -d redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fplaylist%2F https://accounts.spotify.com/api/token

  