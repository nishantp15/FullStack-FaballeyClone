const mongoose = require("mongoose");

const cart = mongoose.model("cart", {
    id : Number,
    uniqueId : Number,
    category : String,
    length : String,
    sleeves : String,
    title : String,
    color : String,
    discount : Number,
    price2 : Number,
    price1 : Number,
    site : String,
    img1 : String,
    img2 : String,
    img3 : String,
    img4 : String,
    qty : Number
});

module.exports = { cart };




