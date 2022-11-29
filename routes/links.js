var router = require('express').Router();
var linksCtrl = require('../controllers/links');

/* GET users listing. */
router.get('/links/new', linksCtrl.create);

module.exports = router;
