import common from './common';
import test from './test';
import production from './production';

let config = common;
switch (process.env.NODE_ENV) {
  case 'production':
    config = { ...config, ...production };
    break;
  case 'test':
    config = { ...config, ...test };
    break;
}

export default config;
