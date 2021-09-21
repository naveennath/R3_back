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
},
isBooked:{
  type:Boolean,
  required:true,
}
})
exports.Booking_request = mongoose.model('Booking_request',booking_requestSchema);