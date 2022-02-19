
const { response } = require('express');
const Usuario = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const  login =  async (req, res = response) => {

    const { email, password } = req.body;
    
    try{

        const usuarioDB = await User.findOne({ email });

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //verificar contraseña

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if( !validPassword ){
            return res.status(404).json({
                ok: false,
                msg: 'Password no encontrado'
            });            
        }
        
        //Generar el token
        const token = await generarJWT ( usuarioDB.id );



        res.status(200).json({
            ok: true,
            token
        });


    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}



const  googleSignIn =  async (req, res = response) => {


    const googleToken = req.body.token;


    try {

        const { name, email, picture } = await googleVerify( googleToken );

        //verificar si existe el usuario

        const usuarioDB = await User.findOne({ email });
        let usuario;

        if(!usuarioDB){
            usuario = new User({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        }else{
            usuario = usuarioDB;
            usuario.google = true;
        }

        await usuarioDB.save();


        //Generar el token
        const token = await generarJWT ( usuario.id );


        res.json({
            ok:true,
            token
        });
    
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg: 'Token no válido'
        });
    }



}


module.exports = {
    login,
    googleSignIn
}