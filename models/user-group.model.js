const { Schema, model } = require('mongoose');



const userGroupSchema = Schema({

    name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    }
});


userGroupSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } =  this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model( 'UserGroup', userGroupSchema );