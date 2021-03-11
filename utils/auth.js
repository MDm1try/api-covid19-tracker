const jwt = require('jsonwebtoken')

const generateAccessToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn })
}

const verifyToken = (token) => {
    const result = jwt.verify(token, process.env.TOKEN_SECRET)
    return result
}

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next() // pass the execution off to whatever request the client intended
    })
}

module.exports = {
    generateAccessToken,
    authenticate,
    verifyToken
}
