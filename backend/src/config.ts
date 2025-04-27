const tokenDB = process.env.TOKEN_DB;
const libsql = process.env.URL_DB;

if (!tokenDB || !libsql) {
  throw new Error('Faltan las variables de entorno: TOKEN_DB o URL_DB');
}

const config = {
  tokenBD: process.env.TOKEN_DB,
  libsql: process.env.URL_DB,
  port: process.env.PORT || 3000,
}

export default config;