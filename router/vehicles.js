const {Vehicle}=require('../models/vehicle');
const express=require('express');
const app = express();
const router= express.Router(); 
const bcrypt =require('bcryptjs');


router.get('/', async (req, res) => {
const regList =  await Vehicle.find();
if(!regList){
  return res.status(500).json({success:false})
}
 return res.send(regList);
});


router.get('/:email', async (req, res) => {
  
const regList =  await Vehicle.find({email:req.params.email}).select('type vehicle_no model_name');


if(!regList){
  return res.status(500).json({success:false,msg:'no address found'})
  
}
  //  return res.status(201).json({type:regList.type,address:regList.address});
 return res.send(regList);

});



router.post('/', async (req, res) => {
  
    const{email,type,vehicle_no}=req.body;
    //    const admin = await Address_data.findOne({email:email});
    // console.log(admin);



const vehicle=new Vehicle({
 
  email:req.body.email,
   type:req.body.type,
   vehicle_no:req.body.vehicle_no,
   model_name:req.body.model_name,
})
// console.log(reg.repass);

await vehicle.save().then((createdVehicle=> {
  return res.status(201).json({
    msg:"Added Successfully"
  })
})).catch((err)=>{
  return res.status(500).json({
  error:err,
  success:false
  })
})


  
});

router.put('/:email',async (req, res)=> {
   const ress=await Vehicle.findOne({email:req.params.email,type:req.body.type});
    const ans=ress._id.toString();
    console.log(ans);
    console.log(req.params.email);
    const reg = await Vehicle.findByIdAndUpdate(
     
        ans,
        {
           
    type:req.body.type,
   vehicle_no:req.body.vehicle_no,
   model_name:req.body.model_name,

        },
        { new: true}
     
    )
 
     res.send(reg);
   

});


router.delete('/:email', async(req, res)=>{
    
        const ress=await Vehicle.findOne({email:req.params.email,type:req.body.type});
    const ans=ress._id.toString();
    Vehicle.findByIdAndRemove(ans).then(reg =>{
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