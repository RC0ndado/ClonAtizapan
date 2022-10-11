// cSpell:disable

// Rutas absolutas
const http = require('http');
const path = require('path');
const helmet = require('helmet');
var compression = require('compression');
require('dotenv').config();


const express = require('express');
const { dirname } = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { get } = require('http');
const cookieParser = require('cookie-parser');

// create server
const app = express();

app.use(helmet());
app.use(compression());

const serverHttp = http.createServer(app);
serverHttp.listen(process.env.HTTP_PORT, process.env.IP);
console.log(process.env.HTTP_PORT)

global.config = require('./config')

// static contai
app.use(express.static('./public'));
app.use(express.static('./views'));


app.locals = global.config;

// Connect Database

/* const connection = mysql.createConnection({
    host: "localhost",
    database: 'desarrollo_movil',
    password: '',
    user: 'root'
}); */

/* connection.connect((error) => {
  if (error) throw error;
  console.log("Connected to database " );
}); */




// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())


app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs', 'global.config.site.html.engine');


// Rutas asignadas

app.get('/main',(req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'prueba.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/reportes', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'report.html'));
});

app.get('*',(req, res)=>{
    res.status(404).send('Error bro')
});

console.log(path.join(__dirname, 'views', 'prueba.html'));


app.post("/login", (req, res) => {
    var usuario = req.body.user;
    const contraseña = req.body.password;
    /* connection.query('SELECT * FROM usuario WHERE Matricula = ?', [usuario] , (error,results) =>{
    console.log(results);}) */
    if(usuario && contraseña){
        console.log('Empezando la conexión')
        connection.query('SELECT * FROM usuario WHERE Matricula = ?',[usuario], (error,results) =>{
        console.log(results);
        app.get("/main")
        if (results==0){
            res.render ('login.html' , {
                alert: true,
                alertTitle: "Matricula no registrada",
                alertMessage: "",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }
        else{
            const pass = results[0].Contraseña;

            if(contraseña != pass){
                res.render ('login.html' , {
                    alert: true,
                    alertTitle: "Incorrect user / password",
                    alertMessage: "",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                })
                console.log('Usuario incorrecto');
            }else{
                    res.render ('login.html' , {
                        alert: true,
                        alertTitle: "Login",
                        alertMessage: "Successful Welcome!",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'reportes'
                    })
                
            }}
                
        })
    }}
);






// Conexión a servidor nodemon
//app.listen(8080,()=>console.log("Servidor en línea"));