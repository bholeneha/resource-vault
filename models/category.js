const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    links: [{ type: Schema.Types.ObjectId, ref: 'Link' }],
});

module.exports = mongoose.model('Category', categorySchema);