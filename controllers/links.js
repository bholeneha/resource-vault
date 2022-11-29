const Category = require('../models/category');

module.exports = {
    create,
};

function create(req, res) {
    res.render('links/new')
}