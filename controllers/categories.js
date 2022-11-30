const Category = require('../models/category');

module.exports = {
    index,
    new: newCategory,
    show,
    create,
    delete: deleteCategory
};

function index(req, res) {
    Category.find({}).then(function (categories, err) {
        if (err) {
            console.log("ERRRRORRRR")
        } else if (req.user && req.user.email == process.env.ADMINEMAIL) {
            req.user.isAdmin = true
            res.render('categories/index', { user: req.user, categories })
        } else {
            res.render('categories/index', { user: req.user, categories })
        }
    })
}

function newCategory(req, res) {
    if (req.user && req.user.email == process.env.ADMINEMAIL) {
        req.user.isAdmin = true
        res.render('categories/new', { user: req.user });
    }
}

function show(req, res) {

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
    Category.deleteOne({ id: req.params.id }).exec(function (err) {
        if (err) return console.log("Errrorrr")
        res.redirect('/categories')
    })
}

