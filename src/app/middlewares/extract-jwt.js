import jwt from 'jsonwebtoken';

export default function extractJWT(secret) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || ''; // Bearer {Token}
    let token = authHeader.split(' ')[1] || req.cookies.token || '';

    if (!token) return next();

    jwt.verify(token, secret, (error, payload) => {
      if (!error) req.user = payload;
      next();
    });
  };
}
