var router = require('express').Router();
var categoriesCtrl = require('../controllers/categories');

/* GET users listing. */
router.get('/', categoriesCtrl.index);

module.exports = router;
