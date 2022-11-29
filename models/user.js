const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    recommendedBy: {
        type: String,
    },
    notes: {
        type: String
    }
})

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    favourites: [favouriteSchema],
    googleId: {
        type: String,
    }
});



module.exports = mongoose.model('User', userSchema);