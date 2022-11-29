const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
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
});

module.exports = mongoose.model('Link', linkSchema);