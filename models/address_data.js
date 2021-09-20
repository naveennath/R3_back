const mongoose=require('mongoose');

const address_dataSchema=mongoose.Schema({
email:
{
  type: String,
 required: true,
},
type:{
  type:String,
  required:true,
},
address:{
  type: String,
  required:true,
}
})

exports.Address_data = mongoose.model('Address_data',address_dataSchema);