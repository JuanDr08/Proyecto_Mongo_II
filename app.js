const {
    Movies,
    Entries,
    Users
} = require('./server/index')

const express = require('express');
const app = express();
const path = require('path')
const router = require('./server/router')

app.use(express.json()); // Definimos que la API recibirá JSON

// Habilitamos el uso de los archivos frontend
app.use('/css', express.static(path.join(__dirname, process.env.EXPRESS_STATIC, 'css')));
app.use('/js', express.static(path.join(__dirname, process.env.EXPRESS_STATIC, 'js')));
app.use('/storage', express.static(path.join(__dirname, process.env.EXPRESS_STATIC, 'storage')));

app.use((req, res, next) => { // Agregamos al objeto request la propiedad __dirname el cual contiene toda la ruta hasta nuestro directorio acutal
    req.__dirname = __dirname;
    next();
}, router);

app.use((req, res) => { // Dado el caso que en nuestra aplicacion nunca se llegue a entrar a uno de los endpoints que hemos definido entonces recurrirá a este
    res.status(404).json({ message: "No tiene autorizacion" })
})

let config = { // definimos las configuraciones del link http
    host: process.env.EXPRESS_HOST,
    port: process.env.EXPRESS_PORT
}

app.listen(config, () => { // Declaramos una escucha de conexiones a la direccion que especificamos
    console.log(`http://${config.host}:${config.port}`)
})

