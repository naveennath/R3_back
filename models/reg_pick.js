const mongoose=require('mongoose');

const reg_pickSchema=mongoose.Schema({
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

exports.Reg_pick = mongoose.model('Reg_pick',reg_pickSchema);
