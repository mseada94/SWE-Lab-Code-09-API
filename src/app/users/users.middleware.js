import { hash } from 'bcrypt';

export function encryptPassword(req, res, next) {
  const password = req.body.password;
  if (!password) next();

  if (password) {
    hash(password, 10)
      .then((hashedPassword) => {
        req.body.password = hashedPassword;
        next();
      })
      .catch((error) => {
        res.locals.error = {
          code: 500,
          message: 'Internal Server Error: Problem in Encryption',
        };
        next();
      });
  }
}

export function hidePassword(req, res, next) {
  if (!res.locals.data) next();

  if (Array.isArray(res.locals.data))
    res.locals.data = res.locals.data.map((item) => ({
      ...item,
      password: '---Hidden---',
    }));
  else res.locals.data = { ...res.locals.data, password: '---Hidden---' };

  next();
}
