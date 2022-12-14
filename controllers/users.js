const User = require('../models/user');

module.exports = {
    index,
    show,
};

function index(req, res, next) {
    if (req.user) {
        res.redirect(`/users/${req.user.id}`)
    } else {
        res.render('users/index', { user: req.user })
    }
}

function show(req, res, next) {
    User.findById(req.params.id).exec(function (err, favourites) {
        res.render('users/show', { user: req.user, favourites })
    })
}
