const User = require('./user.model');
const bcrypt = require('bcrypt');
const { setError } = require('../../helpers/error');
const { validationEmail, validationPassword } = require('../../helpers/utils');
const { createToken, verifyToken } = require('../../helpers/token');

const register = async( req, res, next ) => {
    try {
        const newUser = new User(req.body);
        const emailExist = await User.findOne({ email: newUser.email })
        const usernameExist = await User.findOne({ username: newUser.username });
        if( usernameExist || emailExist ) return next(setError(409, 'This email already exist'));
        const userInDB = await newUser.save();
        res.status(201).json( userInDB );
    } catch (error) {
        return next(setError(500, error.message || 'Failed create User'));
    }
}

const login = async( req, res ,next ) => {
    try {
        const userInDB = await User.findOne({ email: req.body.email });
        if( !userInDB ) return next(setError(409, 'This email || Username already exists'));

        if( bcrypt.compareSync( req.body.password, userInDB.password )){
            const token = createToken(userInDB._id, userInDB.email );
            return res.status(200).json({ userInDB, token})
        } else {
            return next(setError(401, 'Invalid password'));
        }
    } catch (error) {
        return next(setError(500, error.message || 'Unexpected error login'));
    }
}

module.exports = { register, login };