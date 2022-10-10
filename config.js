var config = {
    baseDatos: {
        host: "localhost",
        database: 'desarrollo_movil',
        password: '',
        user: 'root'
    },

    site: {
        url: 'http://localhost:8080/main',
        title: 'TizAlerta',
        language: 'es',
        html: {
            engine: 'ejs',
            minify: false
        }
    },
};


module.exports = config;