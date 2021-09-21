const {Booking_request}=require('../models/booking_request');
const {Booking_confirm}=require('../models/booking_confirm');
const express=require('express');
const app = express();
const router= express.Router(); 
const bcrypt =require('bcryptjs');


router.get('/', async (req, res) => {
const regList =  await Booking_confirm.find();
if(!regList){
  return res.status(500).json({success:false})
}
 return res.send(regList);
});


router.get('/:pick_email/:email', async (req, res) => {
  console.log(req.params.email);
const regList =  await Booking_confirm.findOne({pick_email:req.params.pick_email,email:req.params.email});
const ans=regList.booking_request.toString();
    console.log(ans);
const reg =  await Booking_request.findById(ans).select('email garbage_type quantity');

if(!regList){
  return res.status(500).json({success:false,msg:'no address found'})
  
}
  //  return res.status(201).json({type:regList.type,address:regList.address});
 return res.send(reg);

});



router.post('/', async (req, res) => {
  
   // const{email,garbage_type,quantity,address}=req.body;
    //    const admin = await Address_data.findOne({email:email});
    // console.log(admin);

const id = await Booking_request.findById(req.body.booking_request)
console.log(id);
    if(!id) return res.status(400).json({msg:'Invalid booking'})


const booking_confirm=new Booking_confirm({
 
  email:req.body.email,
  pick_email:req.body.pick_email,
  booking_request:req.body.booking_request,
  
  
})
// console.log(reg.repass);

await booking_confirm.save().then((createdBooking_confirm=> {
  
  return res.status(201).json({
    name:booking_confirm.name
  })

})).catch((err)=>{
  return res.status(500).json({
  error:err,
  success:false
  })
})
 const reg = await Booking_request.findByIdAndUpdate(
     
        req.body.booking_request,
        {
           isBooked:true,

        },
        { new: true}
     
    )
 
     res.send(reg);
  
});

router.delete('/:email', async(req, res)=>{
    
        const ress=await Booking_confirm.findOne({email:req.params.email,garbage_type:req.body.garbage_type});
    const ans=ress._id.toString();
    Booking_confirm.findByIdAndRemove(ans).then(reg =>{
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