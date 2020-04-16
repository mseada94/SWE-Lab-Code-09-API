export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const NOT_FOUND = 404;
export const SERVER_ERROR = 500;

export const handlerBuilder = (handler) => {
  return async (req, res, next) => {
    // Skip if error
    if (res.locals.error) return next();
    try {
      const body = req.body;
      const params = req.params;
      const query = req.query;
      const header = req.header;
      const [status, data] = await handler(query, params, body, header);
      if (data) {
        res.locals.status = status;
        res.locals.data = data;
      } else {
        res.locals.error = {
          code: NOT_FOUND,
          message: 'The student is not found',
        };
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.locals.error = {
          code: BAD_REQUEST,
          message: error.message,
        };
      } else if(error.name === 'NotFoundError'){
        res.locals.error = {
          code: NOT_FOUND,
          message: error.message,
        };
      }else {
        console.error(error);
        res.locals.error = {
          code: SERVER_ERROR,
          message: 'Internal Server Error',
        };
      }
    } finally {
      next();
    }
  };
};
