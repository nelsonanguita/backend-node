const {Router} = require('express')
const {check} = require('express-validator')

const {validarCampos} = require('../middlewares/validar-campos')
const {rolCheck, emailCheck, idUserCheck} = require('../helpers/db-validators')

const { getUsers, 
        putUsers, 
        postUsers, 
        deleteUsers} = require('../controllers/user.controllers')

const router = Router();

router.get('/', getUsers);

router.put('/:id',[
        check('id','No es un ID valido').isMongoId(),
        check('id').custom(idUserCheck),
        check('role').optional().custom(rolCheck), //cuando el argumento sea el mismo que el arg que recibe se puede abreviar asi

        validarCampos
],putUsers)

router.post('/',[
check('name','El nombre es obligatorio').not().isEmpty(),
check('password','El password es obligatorio y debe ser de más de 6 letras').isLength({min: 6}),
//scheck('role','No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),

//check('email','El correo no es valido').isEmail(),

//check('role',custom((role) => validoRol(role))
check('email').custom(emailCheck), //cuando el argumento sea el mismo que el arg que recibe se puede abreviar asi
check('role').custom(rolCheck), //cuando el argumento sea el mismo que el arg que recibe se puede abreviar asi

validarCampos],
postUsers)

router.delete('/:id',[
        check('id','No es un ID valido').isMongoId(),
        check('id').custom(idUserCheck),
        validarCampos
],deleteUsers)



module.exports = router;