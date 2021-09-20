const mongoose=require('mongoose');

const booking_requestSchema=mongoose.Schema({
email:
{
  type: String,
 required: true,
},
garbage_type:{
  type: String,
  required:true,
},
quantity:{
  type:String,
  required:true,
},
address:{
  type:String,
  required:true,
}

exports.booking_request = mongoose.model('booking_request',booking_requireSchema}