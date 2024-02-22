const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    products: [
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            require: true
        },
        quantity:{
            type: Number,
            require: true
        }
    }]
})


const CartModel = mongoose.model("carts", CartSchema);

module.exports = CartModel;