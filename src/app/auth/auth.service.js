import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import config from '../config';
import dependencyManager from '../../libs/dependency-manager';

export const login = async function loginFn(data) {
  const usersRepository = dependencyManager.get('users.repository');
  const username = data.username;
  const password = data.password;

  const user = await usersRepository.getByUsername(username);

  if (user) {
    const res = await compare(password, user.password);
    if (res) {
      const signOptions = {
        issuer: 'Tanta University',
        audience: 'http://www.tanta.edu.eg',
        subject: 'anonymous',
        algorithm: 'HS256',
        expiresIn: '1h',
      };

      const payload = {
        username,
        role: user.role,
      };

      const token = sign(payload, config.secret, signOptions);

      return {
        token
      };
    }
  }

  throw new Error();
};
