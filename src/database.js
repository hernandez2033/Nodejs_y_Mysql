//con el modulo mysql solo soporta codigo de coolback, pero con el modulo de util combierte a promesas los coolback  
const mysql = require('mysql');
const { promisify }= require('util');

const { database } = require('./keys');//requiero de el archivo keys solo la duncion database

const pool = mysql.createPool(database);//para generar la conexion a la base de datos
pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){//la conexion con la base de datos fue perdida 
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){//cuantas conecciones tiene asta el momento la base de datos
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSE'){//cuando la conexion a la base de datos a sido rechasada 
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if(connection) connection.release();//si no tengo ningun error comiensa la conexion
    console.log('DB is Connected');
    return;
});
//estamos combirtiendo coolback a promesas
pool.query = promisify(pool.query);
module.exports = pool;

