const mongoose=require('mongoose');

const booking_confirmSchema=mongoose.Schema({

email:
{
  type: String,
 required: true,
},
// garbage_type:{
//   type: String,
//   required:true,
// },
// quantity:{
//   type:String,
//   required:true,
// },
// address:{
//   type:String,
//   required:true,
// },
pick_email:{
  type:String,
  required:true,
},
booking_request:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'booking_request',
  required:true
}
})
exports.Booking_confirm = mongoose.model('Booking_confirm',booking_confirmSchema);