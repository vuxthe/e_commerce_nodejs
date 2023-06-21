import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next()
  } else {
    let [schema, token] = req.headers.authorization.split(' ')
    if (!token) {
      res.status(401).send('Not authorized, no token')
      return next()
    }

    switch (schema) {
      case 'Bearer':
        try {
          const decoded = jwt.verify(token, "secretOrPrivateKey")
          req.user = await User.findById(decoded.id).select('-password')
        } catch (error) {
          console.error(error)
          res.status(401)
          throw new Error('Not authorized, token failed')
        }
        break
      default:
        res.status(403)
        throw new Error('Unsupported authorization scheme')
    }
  }
  next()
})

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
})

export { protect, isAdmin }
