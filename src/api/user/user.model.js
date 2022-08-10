const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { setError } = require('../../helpers/error');
const { validationEmail, validationPassword } = require('../../helpers/utils');
const { createToken, verifyToken } = require('../../helpers/token');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        email: { type: String, unique: true, required: true},
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        favImgs: [{ type: Schema.Types.ObjectId, ref: 'Photo', required: false }],
        photos: [{ type: Schema.Types.ObjectId, ref: 'Photo', required: false }]
    },
    {
        timestamps: true,
    }
);

// antes de insertarlo en la BBDD comprueba los valores
schema.pre('save', function(next){
    if(!validationPassword(this.password)) return next(setError(400, 'Invalid Password'));
    this.password = bcrypt.hashSync( this.password, 16 );
    next();
})


module.exports = mongoose.model( 'User', schema );
