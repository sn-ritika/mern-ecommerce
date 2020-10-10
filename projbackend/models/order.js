const mongoose = require("mongoose");
const{ObjectId} = mongoose.Schema;
const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number               //to be multiplied with items in the cart with price of a unit
});
const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new mongoose.Schema({
  products: [ProductCartSchema],           //products in the cart; productcartschema to be declared later
  transaction_id: {},
  amount: {type: Number},
  adress: String,
  updated: Date,
  user:{
      type: ObjectId,
      ref: "User"
  }
},
{timestamps: true}
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = {Order, ProductCart};