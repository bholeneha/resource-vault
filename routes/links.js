var router = require('express').Router();
var linksCtrl = require('../controllers/links');

/* GET users listing. */

router.get('/links/new', linksCtrl.new);
router.post('/links', linksCtrl.create);
router.get('/links/:id', linksCtrl.show);
router.get('/links/:id/edit', linksCtrl.edit)
router.delete('/links/:id', linksCtrl.delete)
router.put('/links/:id', linksCtrl.update)

module.exports = router;
