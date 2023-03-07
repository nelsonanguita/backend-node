const mongoose = require('mongoose')

const dbConnection  = async()=>{

    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.MONGO_DB)
        console.log('BD arriba')

    } catch (error) {
        console.log("error")
        throw new Error('Error al levantar la BD')
    }
}



module.exports={
    dbConnection
}