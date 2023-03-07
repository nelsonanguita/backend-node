const {response} = require('express') 
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario');

const getUsers = async(req, res = response) =>{

    //const {q, nombre='no name', apikey , page = 1 , limit} = req.query;
    const {limit = 5, desde = 0} = req.query 
    const query = {state : true}
    //falta validar que sea un numero los parametros recibidos
    // const user = await Usuario.find(query)
    // .skip(Number(desde))
    // .limit(Number(limit))
    
    // const total = await Usuario.countDocuments(query);

const [total, user] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limit))
])

    res.json({
        msg: 'get API controllers',
        total,
        user
    })
}

const putUsers = async(req, res = response) =>{

    const {id} = req.params;
    const {_id, password, google, ...resto} = req.body;

    if (password) {
          //Encriptar contraseña
        const salt = bcrypt.genSaltSync() // por defecto esta en (10) 
        resto.password = bcrypt.hashSync(password, salt)
 
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        msg: 'put API controllers',
        usuario
    })
}

const postUsers = async(req, res = response) =>{



    const { name, email, password, role } = req.body
    const usuario = new Usuario({name,email,password,role})
    

    // Verificar correo en la BD si existe
    const existeEmail= await Usuario.findOne({email})
    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya existe'
        })
    }

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync() // por defecto esta en (10) 
    usuario.password = bcrypt.hashSync(password, salt)

    //guarda en la _bd 
    await usuario.save();

    res.json({
        usuario
    })
}

const deleteUsers = async(req, res = response) =>{

    const {id} = req.params

    const usuario = await Usuario.findByIdAndUpdate(id, {state:false}) 
    res.json({
        msg: 'deleted  API controllers',
        usuario

    })
}


module.exports={
    getUsers,
    putUsers,
    postUsers,
    deleteUsers
}
