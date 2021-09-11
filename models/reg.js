const mongoose=require('mongoose');

const regSchema=mongoose.Schema({
  name:{
    type:String,
    required: true,
  },
  email:String,
  pass:{
    type: String,
    required: true,
        min: 8,
  },
  repass:String,
  phone:{
       type: Number,
        required: true,
        min: 10,
        
  }

})

exports.Reg = mongoose.model('Reg',regSchema);