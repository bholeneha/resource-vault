const { isObjectIdOrHexString } = require('mongoose');
const category = require('../models/category');
const Category = require('../models/category');
const Link = require('../models/link')

module.exports = {
    new: newLink,
    create,
    show,
    edit: editLink,
    delete: deleteLink,
    update
};

function newLink(req, res) {
    let categoryNames = []
    Category.find({}).then(function (categories, err) {
        categories.forEach(function (category) {
            categoryNames.push(category.name)
        })
        // console.log(categoryNames)
        res.render('links/new', { categoryNames, user: req.user })
    })

    // let categories = ['Job Boards', 'Open Source', 'Communities', 'Tools', 'Freelance', 'Miscellaneous', 'Coding Challenges', 'Documentation/References']
}

function create(req, res) {
    let newLink = {}
    Category.findOne({ name: req.body.category }).then(function (category, err) {
        if (err) {
            console.log('ERRRORRRRRR')
        } else {
            // console.log(category)
            newLink['categories'] = []
            newLink.categories.push(category.id)
            for (const property in req.body) {
                if (property != 'category') {
                    newLink[property] = req.body[property]
                }
            }
            const link = new Link(newLink)
            link.save(function (err) {
                console.log(link)
                console.log(category.links)
                category.links.push(link.id)
                category.save(function (err, category) {
                    console.log(category)
                    res.redirect(`/links/${link.id}`)
                })
            })
        }
    })
}

function show(req, res) {
    let categoryNames = []
    Link.findById(req.params.id).populate('categories').then(function (link, err) {
        Category.find({}).then(function (categories, err) {
            if (err) {
                console.log("ERRRRORRRR")
            } else if (req.user && req.user.email == process.env.ADMINEMAIL) {
                req.user.isAdmin = true
                res.render('categories/index', { user: req.user, linkToDisplay: link, categories })
            } else {
                res.render('categories/index', { user: req.user, linkToDisplay: link, categories })
            }
        })
    })
}

function editLink(req, res) {
    let categoryNames = []
    Category.find({}).then(function (categories, err) {
        categories.forEach(function (category) {
            categoryNames.push(category.name)
        })
        // console.log(categoryNames)
        Link.findById(req.params.id, function (err, link) {
            res.render('links/edit', { categoryNames, link })
        })
        // res.render('links/new', { categoryNames, user: req.user })
    })

}

function deleteLink(req, res) {
    Link.findByIdAndDelete(req.params.id, async function (err, link) {
        //nice trick! 
        await Category.updateMany({ $pull: { links: link._id } })
        res.redirect('/categories')
    })
}

function update(req, res) {
    Link.findById(req.params.id, function (err, link) {
        for (const property in req.body) {
            if (property != 'category') {
                link[property] = req.body[property]
            }
        }

        console.log(link)
        Category.findOne({ name: req.body.category }).then(function (category, err) {
            console.log(category)
            if (err) {
                console.log('ERRRORRRRRR')
            } else {
                link['categories'] = []
                link.categories.push(category.id)
            }

            if (!category.links.includes(link.id)) {
                category.links.push(link.id)
            }

            const p1 = link.save()
            const p2 = category.save()

            Promise.all([p1, p2]).then(function (results) {
                console.log(results)
                res.redirect(`/links/${results[0].id}`)
            })
        }
        )
    })

}
