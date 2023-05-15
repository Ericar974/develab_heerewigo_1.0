const mysql = require('mysql');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.load();

function DB() {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });
}

function query($command){
    return new Promise((resolve, reject) => {
        const database = DB();

        database.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err.stack);
                reject(err);
            }
            database.query('USE ' + process.env.DB_NAME, (err, result) => {
                if (err) throw err;
            });

            database.query($command, function (err, results) {
                if (err) {
                    console.error('Error executing query:', err.stack);
                    reject(err);
                }
                resolve(results);
            });

            database.end((err) => {
                if (err) {
                    console.error('Error disconnecting from MySQL:', err.stack);
                    reject(err);
                }
            });
        });
    });


}

/**
 * make sure the database existe, if not create one.
 */
function up() {
    const database = DB()

    const sql = fs.readFileSync('./database/' + process.env.DB_NAME + '.sql').toString().split(';');

    let createDB = false;

    database.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err.stack);
            return;
        }

        database.query("SELECT COUNT(*) AS count FROM information_schema.schemata WHERE schema_name = ?", [process.env.DB_NAME], (err, result) => {
            if (err) throw err;
            if (result[0].count === 0) {
                database.query('CREATE DATABASE ' + process.env.DB_NAME, (err, result) => {
                    if (err) throw err;
                    createDB = true;
                });
            }
        });

        if(createDB){
            database.query('USE ' + process.env.DB_NAME, (err, result) => {
                if (err) throw err;
            });

            sql.forEach(command => {
                if (command == '\n') {

                } else {
                    database.query(command, (err, result) => {
                        if (err) throw err;
                    });
                }
            })
        }
        database.end((err) => {
            if (err) {
                console.error('Error disconnecting from MySQL:', err.stack);
            }
        });
    });
}

module.exports = {up, query, DB};