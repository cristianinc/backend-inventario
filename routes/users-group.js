const { Router } = require('express');
const { getUserGroup, addUserGroup, editUserGroup, deleteUserGroup } = require('../controllers/user-group.controller');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


/* Falta validar el cvalidarJWT */

router.get( '/', getUserGroup );

router.post( '/', [ check('name', 'El nombre es obligatorio').not().isEmpty(),
                    check('level', 'El level es obligatorio').not().isEmpty(),
                    check('status', 'El status es obligatorio').not().isEmpty(),
                    validarCampos,
                ] ,addUserGroup );

//  router.put( '/:id', [ validarJWT,
router.put( '/:id', [ 
                            check('name', 'El nombre es obligatorio').not().isEmpty(),
                            check('level', 'El level es obligatorio').not().isEmpty(),
                            check('status', 'El status es obligatorio').not().isEmpty(),
                    validarCampos,
                ], editUserGroup );

router.delete( '/:id', deleteUserGroup );




module.exports = router ;