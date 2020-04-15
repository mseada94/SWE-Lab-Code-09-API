import ValidationError from '../errors/ValidationError';
export function validateCreate(body) {
  const results = [];

  const firstNameIsNotNull = Boolean(body.firstName);
  if (!firstNameIsNotNull) results.push('FirstName is required');

  const lastNameIsNotNull = Boolean(body.lastName);
  if (!lastNameIsNotNull) results.push('LastName is required');

  const ageIsNotNull = Boolean(body.age > 20);
  if (!ageIsNotNull) results.push('Age is required');

  const ageIsGreaterThan20 = Boolean(body.age > 20);
  if (!ageIsGreaterThan20) results.push('Age should be greater than 20');

  if (results.length > 0)
    throw new ValidationError(`Invalid student: ${results.join(', ')}`);
}

export function validateUpdate(body) {
  const results = [];

  const ageIsGreaterThan20 = body.age == undefined || Boolean(body.age > 20);
  if (!ageIsGreaterThan20) results.push('Age should be greater than 20');

  if (results.length > 0)
    throw new ValidationError(`Invalid student: ${results.join(', ')}`);
}

export function validateReplace(body) {
  const results = [];

  const firstNameIsNotNull = Boolean(body.firstName);
  if (!firstNameIsNotNull) results.push('FirstName is required');

  const lastNameIsNotNull = Boolean(body.lastName);
  if (!lastNameIsNotNull) results.push('LastName is required');

  const ageIsNotNull = Boolean(body.age > 20);
  if (!ageIsNotNull) results.push('Age is required');

  const ageIsGreaterThan20 = Boolean(body.age > 20);
  if (!ageIsGreaterThan20) results.push('Age should be greater than 20');

  if (results.length > 0)
    throw new ValidationError(`Invalid student: ${results.join(', ')}`);
}
