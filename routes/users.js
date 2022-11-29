var router = require('express').Router();
var usersCtrl = require('../controllers/users');

/* GET users listing. */
router.get('/users/index', usersCtrl.index);
router.get('/users/:id', usersCtrl.show);

module.exports = router;
