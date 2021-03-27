const jwt = require('jsonwebtoken')
const Users = require('../models/Users')

const generateAccessToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn })
}

const verifyToken = (token) => {
    const result = jwt.verify(token, process.env.TOKEN_SECRET)
    return result
}

const authenticate = (type) => {
    return async (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (!token) return res.status(401).send({ error: 'Token not provided' }) // if there isn't any token
    
        const data = verifyToken(token)
        if (!data) {
            return res.status(401).send({ error: 'Token is invalid' }) // if there isn't any token
        }

        const user = await Users.findById(data._id)
        if (!user) return res.status(401).send({ error: 'Token is invalid' }) 

        if ((type && user.type === type) || type === undefined) {
            req.user = user
            next() // pass the execution off to whatever request the client intended
        }
    }
}


module.exports = {
    generateAccessToken,
    authenticate,
    verifyToken
}
