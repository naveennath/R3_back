const mongoose=require('mongoose');

const collectionSchema=mongoose.Schema({
c_email:
{
  type: String,
 required: true,
},

booking_confirm:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'booking_confirm',
  required:true
}
})

exports.Collection = mongoose.model('Collection',collectionSchema);