import ValidationError from '../errors/ValidationError';
export function validateLogin(body) {
  const results = [];

  const usernameIsNotNull = Boolean(body.username);
  if (!usernameIsNotNull) results.push('Username is required');

  const passwordIsNotNull = Boolean(body.password);
  if (!passwordIsNotNull) results.push('Password is required');

  if (results.length > 0)
    throw new ValidationError(`Invalid Request: ${results.join(', ')}`);
}
