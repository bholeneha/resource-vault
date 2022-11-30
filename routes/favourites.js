var router = require('express').Router();
var favouritesCtrl = require('../controllers/favourites');

router.get('/users/:id/favourites', favouritesCtrl.show)
router.post('/users/:id/favourites', favouritesCtrl.create);
router.delete('/favourites/:id', favouritesCtrl.delete)

module.exports = router;
