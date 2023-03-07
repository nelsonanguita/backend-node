const Rol = require('../models/rol')
const Usuario = require('../models/usuario')
const rolCheck = async(role='')=>{
        
    const existeRol = await Rol.findOne({role})
    if (!existeRol) {
            throw new Error(`El rol ${role} no esta registrado en la BD`)
    }
}

const emailCheck = async(email='')=>{
        
    const existeEmail = await Usuario.findOne({email})
    if (existeEmail) {
            throw new Error(`El email ${email} ya está registrado en la BD`)
    }
}


const idUserCheck = async(id)=>{

    const existeID = await Usuario.findById(id);
    //const existeID = Usuario.findOne({_id: new ObjectId(id)})
    if (!existeID) {
        throw new Error(`El id: ${id}  no existe en la BD`);
    }
}


module.exports = {
    rolCheck,
    emailCheck,
    idUserCheck
}