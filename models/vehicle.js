const mongoose=require('mongoose');

const vehicleSchema=mongoose.Schema({
email:
{
  type: String,
 required: true,
},
type:{
  type: String,
  required:true,
},
vehicle_no:{
type:String,
required:true,
}
})

exports.Vehicle = mongoose.model('Vehicle',vehicleSchema);