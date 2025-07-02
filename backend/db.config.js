const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    port: process.env.PORT,
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,  
    database: process.env.DATABASE
})

module.exports =  pool;




// async function initDb() {
//   const pool =  mysql.createPool({
//     port: process.env.PORT,
//     connectionLimit: 10,
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,  
//     database: process.env.DATABASE
//   });
//   return pool;
// }