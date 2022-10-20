
/* Creating a new instance of the FCM class. */


const FCM = require('fcm-node');
const serverKey = 'AAAAwJ0hCa4:APA91bEjbMn5zY7xygpQXitNQlQnBaWSPhZ651UATRYooLXnrtKDAcyEsNUPjCAtwB2IQo71vHHByoHuJs9xQkaL87ufx4ScJO9yirNiojIPJPVSoCTo9tGWl2544otDSWmlUGjAIjc9';
const fcm = new FCM(serverKey);

const { DBConnect } = require('./config/mysql');


DBConnect.query('SELECT * FROM notificacion ORDER BY id DESC', (error, results)=>{
    const title = results[0].titulo;
    const desc = results[0].descripcion;

    const message = {

        to:'/topics/TizAlerta',
        notification: {
            title: title,
            body: desc
        },
        data: {
            title: 'Título de los datos',
            body: '{"name" : "Laptop", "product_id" : "12345", "final_price" : "15300"}'
        },
    };
    
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Error al enivar mensaje" + err);
            console.log("Respuesta: " + response);
        } else {
            console.log("Mensaje enviado correctamente: ", response);
        }
    })

})

