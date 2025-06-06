import dotenv from 'dotenv';

dotenv.config();

const tokenDB = process.env.TOKEN_DB;
const libsql = process.env.URL_DB;
const port = process.env.PORT;
const adminToken = process.env.ADMIN_TOKEN;
const jwtAccessToken = process.env.JWT_ACCESS_TOKEN;
const jwtAccessExpires = process.env.JWT_ACCESS_EXPIRES;

const config = {
  tokenDB,
  libsql,
  port: port || '3000',
  adminToken,
  jwtAccessToken,
  jwtAccessExpires
}

export default config;