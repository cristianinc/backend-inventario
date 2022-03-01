const { Schema, model } = require('mongoose');



const mediaSchema = Schema({

    file_name: {
        type: String,
        required: true
    },
    file_type: {
        type: String,
        required: true
    }
});


mediaSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } =  this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model( 'Media', mediaSchema );