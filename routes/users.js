var router = require('express').Router();
var usersCtrl = require('../controllers/users');

/* User Related Routes */

router.get('/users/index', usersCtrl.index);
router.get('/users/:id', usersCtrl.show);

module.exports = router;
