const {response} = require('express') 

const getUsers = (req, res = response) =>{

    const {q, nombre='no name', apikey} = req.query;
    res.json({
        msg: 'get API controllers',
        q,
        nombre,
        apikey
    })
}

const putUsers = (req, res = response) =>{

    const id = req.params.id;

    res.json({
        msg: 'put API controllers',
        id
    })
}

const postUsers = (req, res = response) =>{

    const {nombre, edad} = req.body
    res.json({

        msg: 'post API controllers',
        nombre,
        edad
    })
}

const deleteUsers = (req, res = response) =>{

    res.json({
        msg: 'deleted  API controllers'
    })
}


module.exports={
    getUsers,
    putUsers,
    postUsers,
    deleteUsers
}
