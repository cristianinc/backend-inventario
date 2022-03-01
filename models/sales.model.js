const { Schema, model } = require('mongoose');



const saleSchema = Schema({

    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    datetime: {
        type: Date,
        required: true
    }
});


saleSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } =  this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model( 'Sale', saleSchema );