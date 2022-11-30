const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['Job Boards', 'Open Source', 'Communities', 'Tools', 'Freelance', 'Miscellaneous', 'Coding Challenges', 'Documentation'],
    },
    links: [{ type: Schema.Types.ObjectId, ref: 'Link' }],
    hits: {
        type: Number
    }
});

module.exports = mongoose.model('Category', categorySchema);