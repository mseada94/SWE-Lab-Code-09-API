const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
export default function grant(...roles) {
  const isAllowed = (role) => roles.length === 0 || roles.indexOf(role) > -1;

  // return a middleware
  return (req, res, next) => {
    if (!req.user) {
      res.locals.error = {
        code: UNAUTHORIZED,
        message: 'Unauthorized Access: Please send your authentication token',
      };
      next();
    }
    if (!isAllowed(req.user.role))
      res.locals.error = {
        code: FORBIDDEN,
        message: `Unauthorized Access: Your role (${req.user.role}) does not has the required privilege`,
      };
    next();
  };
}
