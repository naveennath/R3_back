const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
  name:String,
  image:String,
  weight: Number
})

exports.Product = mongoose.model('Product',productSchema);