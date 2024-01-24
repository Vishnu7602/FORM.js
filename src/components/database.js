const mysql = require('mysql2/promise');

async function getPSConnection() {
  console.log('DATABASE_URL2:', process.env.DATABASE_URL2);
const url = new URL(process.env.DATABASE_URL2);
  


  const host = url.hostname;
  const user = url.username;
  const password = url.password;
  const database = url.pathname.replace(/^\//, ''); 

  
  const certificate = process.env.PLANETSCALE_CA_CERT;

  
  const connection = await mysql.createConnection({
    host,
    user,
    password,
    database,
    ssl: {
      ca: Buffer.from(certificate, 'utf-8'),
    },
  });
  

  return connection;
}

export default getPSConnection;