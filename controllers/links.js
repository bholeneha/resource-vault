const Category = require('../models/category');

module.exports = {
    create,
};

function create(req, res) {
    let categories = ['Job Boards', 'Open Source', 'Communities', 'Tools', 'Freelance', 'Miscellaneous', 'Coding Challenges', 'Documentation/References']
    res.render('links/new', { categories, user: req.user })
}