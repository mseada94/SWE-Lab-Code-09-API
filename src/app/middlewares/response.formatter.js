export function responseFormatter(req, res, next) {
  if (res.locals.data) {
    res.status(res.locals.status);
    res.json({
      ...req.query,
      timeStamp: Date.now(),
      data: res.locals.data,
    });
  } else if (res.locals.error) {
    const code = res.locals.error.code || 500;
    const message = res.locals.error.message || 'Internal Server Error';

    res.status(code);
    res.json({
      ...req.query,
      code,
      message,
      timeStamp: Date.now(),
      path: req.url,
      method: req.method,
    });
  }
  next();
}
