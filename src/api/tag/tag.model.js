const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        title: { type: String, required: true },
        color: { type: String, required: false},
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model( 'Tag', schema );