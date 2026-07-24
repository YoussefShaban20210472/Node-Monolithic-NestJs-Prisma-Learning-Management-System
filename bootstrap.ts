import dotenv from 'dotenv';
const env = process.env.NODE_ENV || 'development';
console.log(env);
dotenv.config({
  path: `.env.${env}`,
});
