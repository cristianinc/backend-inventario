const { response } = require('express');
const UserGroup = require('../models/user-group.model');




const getUserGroup = async (req, res) => {

    const userGroup = await UserGroup.find()
                                //.populate('usuario', 'nombre email img')

    res.json({
        ok: true,
        userGroup
    });

}

const addUserGroup = async (req, res = response) => {
    

    const uid = req.uid    
    const userGroup = new UserGroup( { usuario: uid, ...req.body} );


    try {
        

        const userGroupDB = await userGroup.save();
        res.json({
            ok: true,
            userGroup: userGroupDB
        });

    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }



}


const editUserGroup = async (req, res = response) => {


    const id = req.params.id;


    try {

        const userGroup = await UserGroup.findById( id );

        if( !userGroup ){
            res.status(404).json({
                ok: false,
                msg: 'grupo de usuario no encontrado'
            });
        }

        const changesUserGroup = {
            ...req.body
        }

        const userGroupUpdated = await UserGroup.findByIdAndUpdate( id, changesUserGroup, { new: true } );


        res.json({
            ok: true,
            msg: 'actualizar grupo de usuario',
            userGroupUpdated
        });
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }



}


const deleteUserGroup = async (req, res = response) => {

    const id = req.params.id;


    try {

        const userGroup = await UserGroup.findById( id );

        if( !userGroup ){
            res.status(404).json({
                ok: false,
                msg: 'grupo de usuario no encontrado'
            });
        }

        await UserGroup.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'eliminar grupo de usuario',

        });
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = { getUserGroup, addUserGroup, editUserGroup, deleteUserGroup }