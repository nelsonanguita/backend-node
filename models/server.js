const express = require('express');
const cors  = require('cors')
const {dbConnection} = require('../database/config.db')

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
       
        this.usuariosPath = '/api/usuarios'


        //conectar a la BD
        this.conectarDB();

        //Middlewares
        this.middlewares();
       
        //rutas
        this.routes();

    }


    async conectarDB(){
        await dbConnection()
    }


    middlewares(){

        //CORS
        this.app.use(cors())

        //Parseo y lectura del body
        this.app.use( express.json())

        //directorio publico
        this.app.use(express.static('public')) // middlewares se identifican con el prefijo 'use'
    }


    routes(){
        this.app.use(this.usuariosPath,require('../routes/user.routes'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor levandado en el puerto '+ this.port)
        })
        
    }





}

module.exports = Server;
