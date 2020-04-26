export function responseFormatter(req, res, next) {
  if (res.locals.error) {
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
  } else if (res.locals.data) {
    if (res.locals.cookies) {
      for (let [key, value] of Object.entries(res.locals.cookies))
        res.cookie(key, value, { httpOnly: true });
    }
    res.status(res.locals.status);
    res.json({
      ...req.query,
      timeStamp: Date.now(),
      data: res.locals.data,
    });
  }
  next();
}
