const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');
const bcrypt = require('bcryptjs')

const User = require('../models/user.model');


const getUsers = async (req, res) => {


    const desde = Number(req.query.desde) || 0;

    const [ users, total ] = await Promise.all([
        User
                .find({}, 'nombre email role goole img')
                .skip( desde )
                .limit( 5 ),

        User.countDocuments()
    ]);

    res.json({
        ok: true,
        users,
        total
    });

}

const addUsers = async (req, res = response) => {
    
    const { email, password } = req.body;


    try{

        const existeEmail = await User.findOne({ email });

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const user = new User( req.body );
        
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
        
        
        await user.save();

        //Generar el token
        const token = await generarJWT ( user.id );
    
        res.json({
            ok: true,
            user,
            token
        });

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado favor revisar los log.....'
        })
    }




}


const editUsers = async (req, res = response) => {

    //TODO: validar token y comprobar si el usuario es correcto


    const uid = req.params.id;

    try {
        
        const usuarioDB = await User.findById( uid );

        if( !usuarioDB ){
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        //actualizar
        const { password, google, email, ...campos } = req.body;
        
        if( usuarioDB.email != email ){
            const existeEmail = await User.findOne({ email });
            if( existeEmail){
                res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese Email.'
                });
            }
        }
        campos.email = email;
        const usuarioActualizado = await User.findOneAndUpdate( uid, campos, { new:true } );


        res.json({
            ok: true,
            user: usuarioActualizado
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const deleteUsers = async (req, res = response) => {



    const uid = req.params.id;

    try {
        
        const usuarioDB = await Usuario.findById( uid );

       

        if( !usuarioDB ){
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findOneAndDelete( uid );

        res.json({
            ok: true,
            usuario: 'registro eliminado con éxito'
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

module.exports = { getUsers, addUsers, editUsers, deleteUsers }