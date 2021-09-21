const {Collection}=require('../models/collection');
const {Booking_confirm}=require('../models/booking_confirm');
const express=require('express');
const app = express();
const router= express.Router(); 
const bcrypt =require('bcryptjs');


router.get('/', async (req, res) => {
const regList =  await Collection.find();
if(!regList){
  return res.status(500).json({success:false})
}
 return res.send(regList);
});


router.get('/:c_email', async (req, res) => {
  
const regList =  await Collection.find({c_email:req.params.c_email});
console.log(regList.length);

const reg={};
let ans=[];
var i=0;
for(var attributename in regList){

    console.log(attributename+": "+regList[attributename].booking_confirm);

 ans[i]=regList[attributename].booking_confirm.toString();
    console.log(ans[i]);
 reg[i] =  await Booking_confirm.findById(ans[i]).select('email pick_email booking_request');

if(!reg[i]){
  return res.status(500).json({success:false,msg:'no address found'})
  
}

  //  return res.status(201).json({type:regList.type,address:regList.address});
// console.log(reg[i])
 
 
  console.log(i);
 
    i=i+1;
}
// console.log(reg);
 return res.json(reg); 

});



router.post('/', async (req, res) => {
  
   // const{email,garbage_type,quantity,address}=req.body;
    //    const admin = await Address_data.findOne({email:email});
    // console.log(admin);

const id = await Booking_confirm.findById(req.body.booking_confirm)
console.log(id);
    if(!id) return res.status(400).json({msg:'Invalid booking'})


const collection=new Collection({
 
  c_email:req.body.c_email,
  
  booking_confirm:req.body.booking_confirm,
  
  
})
// console.log(reg.repass);

await collection.save().then((createdCollection=> {
  
  return res.status(201).json({
    name:collection.name
  })

})).catch((err)=>{
  return res.status(500).json({
  error:err,
  success:false
  })
})
});

router.delete('/:c_email', async(req, res)=>{
    
        const ress=await Collection.findOne({c_email:req.params.c_email,booking_confirm:req.body.booking_confirm});
    const ans=ress._id.toString();
    Collection.findByIdAndRemove(ans).then(reg =>{
        if(reg) {
            return res.status(200).json({success: true, message: 'the reg is deleted!'});
        } else {
            return res.status(404).json({success: false , message: "reg not found!"});
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) ;
    });
});
module.exports=router;