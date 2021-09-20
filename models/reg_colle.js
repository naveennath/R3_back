const mongoose=require('mongoose');

const reg_colleSchema=mongoose.Schema({
  name:{
    type:String,
    required: true,
  },
  email:String,
  pass:{
    type: String,
    required: true,
        min: 6,
  },
 
  phone:{
       type: Number,
        required: true,
        min: 10,
        
  }


})

exports.Reg_colle = mongoose.model('Reg_colle',reg_colleSchema);
