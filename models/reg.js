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
        min: 6,
  },
 
  phone:{
       type: Number,
        required: true,
        min: 10,
        
  }


})

regSchema.virtual('id').get(function(){
return this._id.toHexString();
});
regSchema.set('toJson',{
  virtuals:true,
});
exports.Reg = mongoose.model('Reg',regSchema);
exports.regSchema=regSchema;