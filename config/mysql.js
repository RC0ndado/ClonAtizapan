const mysql = require('mysql')

const DBConnect = mysql.createPool({   
        host: "localhost",
        database: 'tizalertap',
        password: '',
        user: 'root',
    },
    console.log('******** DATABASE CONNECTION ********** '))


/*
DBConnect.query('SELECT * FROM usuario', (err, results) => {
    console.log(' ***** Primer registro desde archivo  "mysql.js" *****\n', results[0], '\n Termina archivo mysql.js \n' )
})*/

module.exports = {DBConnect}

