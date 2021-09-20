const mongoose=require('mongoose');

const coinSchema=mongoose.Schema({
email:
{
  type: String,
 required: true,
},
value:{
  type: Number,
  required:true,
}
})

exports.Coin = mongoose.model('Coin',coinSchema);