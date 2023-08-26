/* eslint-disable prettier/prettier */
import { config } from 'dotenv';
import * as configurations from './src/config/database';

config();
let { NODE_ENV } = process.env;
if (!NODE_ENV) {
  NODE_ENV = 'development';
}
let connectionOptions = null;
switch (NODE_ENV.toLocaleLowerCase()) {
  case 'development':
    connectionOptions = configurations.development;
    break;
  case 'test':
    connectionOptions = configurations.test;
    break;
  default:
    connectionOptions = configurations.development;
    break;
}

export default connectionOptions;
