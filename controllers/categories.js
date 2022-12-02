const Category = require('../models/category');
const Link = require('../models/link')

module.exports = {
    index,
    new: newCategory,
    show,
    create,
    delete: deleteCategory
};

function index(req, res) {
    Category.find({})
        .populate('links')
        .exec(function (err, category) {
            Link.find({})
                .where('_id')
                .nin(category.links)
                .exec(function (err, links) {
                    Category.find({}).then(function (categories, err) {
                        if (err) {
                            console.log("ERRRRORRRR")
                        } else if (req.user && req.user.email == process.env.ADMINEMAIL) {
                            req.user.isAdmin = true
                            res.render('categories/index', { user: req.user, categories, links })
                        } else {
                            res.render('categories/index', { user: req.user, categories, links })
                        }
                    })
                })
        })
}

function newCategory(req, res) {
    if (req.user && req.user.email == process.env.ADMINEMAIL) {
        req.user.isAdmin = true
        res.render('categories/new', { user: req.user });
    }
}

function show(req, res) {
    console.log(req.params.id)
    Category.findById(req.params.id)
        .populate('links')
        .exec(function (err, category) {
            Category.find({}).then(function (categories, err) {
                if (err) {
                    console.log("ERRRRORRRR")
                } else if (req.user && req.user.email == process.env.ADMINEMAIL) {
                    req.user.isAdmin = true
                    res.render('categories/index', { user: req.user, category, categories })
                } else {
                    res.render('categories/index', { user: req.user, category, categories })
                }
                console.log(category)
            })
        })
}

function create(req, res) {
    console.log(req.body)
    const category = new Category(req.body)
    category.save().then(function (category, err) {
        if (err) {
            console.log("ERRRORR" + err)
        } else {
            console.log(category)
            res.redirect('/categories')
        }
    })
}

function deleteCategory(req, res) {
    console.log(req.params.id)
    Category.findByIdAndDelete(req.params.id, function (err, category) {
        if (err) return console.log("Errrorrr")
        console.log(category + "removed")
        res.redirect('/categories')
    })
}

