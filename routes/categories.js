var router = require('express').Router();
var categoriesCtrl = require('../controllers/categories');

/* Category Related Routes */

router.get('/', categoriesCtrl.index);
router.get('/new', categoriesCtrl.new);
router.get('/:id', categoriesCtrl.show);
router.post('/', categoriesCtrl.create);
router.delete('/:id', categoriesCtrl.delete);


module.exports = router;
