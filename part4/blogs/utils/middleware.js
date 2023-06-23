const logger = require('./logger')
const jwt = require('jsonwebtoken')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
    // Get the token
    const authorization = request.get('authorization')
    // Set token
    if (authorization && authorization.startsWith('bearer ')) {
      const token = authorization.replace('bearer ', '')
      // Add token to request
      request.token = token
    }
    next()
}

const userExtractor = (request, response, next) => {
    // Verify token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    // Set request.user to id of token
    request.user = decodedToken.id.toString()
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })}
    // } else if (error.name === 'TokenExpiredError') {
    //     return response.status(401).json({
    //         error: 'token expired'
    //     })
    // }
    next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}