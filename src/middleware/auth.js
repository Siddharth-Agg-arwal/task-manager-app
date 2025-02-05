const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log('Received Token:', token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('Decoded Token:', decoded);

        const user = await User.findOne({ _id : decoded._id, 'tokens.token' : token })
        console.log('Found User:', user);
        console.log('User in DB:', await User.findOne({ _id: decoded._id }));
        
        if(!user){
            throw new Error()
        }
        
        req.token = token
        req.user = user
        next()

    } catch (e) {
        res.status(401).send({ error : 'Please Authenticate.'})
    }
}

module.exports = auth