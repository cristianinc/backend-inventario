const { Schema, model } = require('mongoose');



const productSchema = Schema({

    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    buy_price: {
        type: Number,
        required: true
    },
    sale_price: {
        type: Number,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    mediaId: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        required: true
    }
});


productSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } =  this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model( 'Product', categorySchproductSchemaema );