const express = require('express')
const routes = express.Router();
const searchCtrl = require('../controller/search')

routes.post('/search', searchCtrl.playlists)
routes.get('/:id/:query/tracks', searchCtrl.tracks)
routes.get('/form', searchCtrl.form)
routes.post('/create', searchCtrl.create)

module.exports = routes;