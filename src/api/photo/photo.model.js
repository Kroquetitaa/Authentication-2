const mongoose = require('mongoose');
const { HASHTAG } = require('../../helpers/constants/hashtag');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: false },
        photo: { type: String, required: true },
        author: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
        hastag: [{ type: String, enum: HASHTAG, required: true }],
        likes: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model( 'Photo', schema );