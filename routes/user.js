const { Router } = require('express');
const { getUsers, addUsers, editUsers, deleteUsers } = require('../controllers/user.controller');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get( '/', getUsers );

router.post( '/', [
                    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                    check('password', 'El password es obligatorio').not().isEmpty(),
                    check('email', 'El email es obligatorio').isEmail(),
                    validarCampos,
                ] ,addUsers );

router.put( '/:id', [ validarJWT,
                    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                    check('email', 'El email es obligatorio').isEmail(),
                    check('role', 'El role es obligatorio').not().isEmpty(),
                    validarCampos,
                ], editUsers );

router.delete( '/:id', validarJWT, deleteUsers );




module.exports = router ;