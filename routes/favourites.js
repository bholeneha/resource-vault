var router = require('express').Router();
var favouritesCtrl = require('../controllers/favourites');

/* Favourites Related Routes */

router.get('/users/:id/favourites', favouritesCtrl.index)
router.get('/users/:uid/favourites/:fid', favouritesCtrl.show)
router.post('/users/:id/favourites/new', favouritesCtrl.new)
router.post('/users/:id/favourites', favouritesCtrl.create);
router.delete('/users/:uid/favourites/:fid', favouritesCtrl.delete)

module.exports = router;
