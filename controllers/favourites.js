const Link = require('../models/link');
const User = require('../models/user');
const Category = require('../models/category')

module.exports = {
    index,
    show,
    create,
    delete: deleteOne,
    new: newFav
};

function index(req, res) {
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
    let newFav = {}
    Category.findOne({ name: req.body.category }).then(function (category, err) {
        if (err) {
            console.log('ERRRORRRRRR')
        } else {
            newFav['categories'] = []
            newFav.categories.push(category.id)
            for (const property in req.body) {
                if (property != 'category') {
                    newFav[property] = req.body[property]
                }
            }

            User.findById(req.params.id, function (err, user) {
                user.favourites.push(newFav)
                user.save(function (err) {
                    res.redirect(`/users/${user.id}/favourites`)
                })
            })
        }
    })
}

function show(req, res) {
    User.findById(req.params.uid).then(function (result, err) {
        let fav = result.favourites.find(f => f.id == req.params.fid)
        console.log(req.user)
        res.render('favourites/show', { fav, user: req.user })
    })
}

function newFav(req, res) {

    const p1 = Link.findById(req.body.linkID)
    const p2 = User.findById(req.params.id)

    Promise.all([p1, p2])
        .then(function (results) {
            let link = results[0]
            let user = results[1]
            let categoryNames = []
            Category.find({}, function (err, categories) {
                categories.forEach(function (category) {
                    categoryNames.push(category.name)
                })
                res.render('favourites/new', { categoryNames, link, user })
            })
        })
}

function deleteOne(req, res) {
    User.findById(req.params.uid, function (err, user) {
        user.favourites.id(req.params.fid).remove()
        user.save()
        res.redirect(`/user/${req.params.uid}/favourites`)
    })
}
