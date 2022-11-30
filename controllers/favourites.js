const User = require('../models/user');

module.exports = {
    show,
    create,
    delete: deleteOne
};

function show(req, res) {
    User.find(req.params.id)
        .populate('favourites')
        .exec(function (err, user) {
            User.find({})
                .where('_id')
                .nin(user?.favourites)
                .exec(function (err, favourites) {
                    res.render('favourites/index', { user: req.user, favourites })
                })
        })
}

function create(req, res) {

}

function deleteOne(req, res) {

}