const mongoose=require('mongoose');

const booking_confirmSchema=mongoose.Schema({

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
},
pick_email:{
  type:String,
  required:true,
}

exports.booking_confirm = mongoose.model('booking_confirm',booking_confirmSchema}