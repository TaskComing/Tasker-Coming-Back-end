// const jwt = require('jsonwebtoken');
// const { UnauthenticatedError } = require('../errors');

// const auth = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     throw new UnauthenticatedError('Authorization invalid');
//   }
//   const token = authHeader.split(' ')[1];

//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = { userId: payload.userId, name: payload.name };
//     next();
//   } catch (error) {
//     throw new UnauthenticatedError('Authorization invalid');
//   }
// };

// module.exports = auth;
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const auth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error('User is not authorized');
      }
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error('User is not authorized or token is missing');
    }
  }
});

module.exports = auth;
