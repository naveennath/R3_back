const {Booking_request}=require('../models/booking_request');
const {Booking_confirm}=require('../models/booking_confirm');
const {Reg_pick}=require('../models/reg_pick');

const express=require('express');
const app = express();
const router= express.Router(); 


router.get('/:email', async (req, res) => {
  console.log(req.params.email);
const regList =  await Booking_confirm.find({email:req.params.email}).select('pick_email booking_request');
const anss={};
for( let i=0;i<regList.length;i=i+1){
const ans=regList[i].booking_request.toString();
const ema=regList[i].pick_email;
    console.log(ans);
    console.log(ema);
    const res1={
        garbage_type:"",
        quantity:"",
        address:"",
        name:"",
        phone:"",
        pick_email:"",
    };
    const ress1 =  await Booking_request.findById(ans).select('address garbage_type quantity');
    const res2= await Reg_pick.findOne({email:ema}).select('name phone email');
    console.log(res2.phone);
  ress1.toJSON();
  res2.toJSON();
  res1['garbage_type']=ress1.garbage_type;
  res1['quantity']=ress1.quantity;
  res1['address']=ress1.address;
    res1['name'] = res2.name;
    res1['phone'] = res2.phone;
    res1['pick_email'] = res2.email;

console.log(res1);
    
anss[i]=res1;
}
console.log(regList);
if(!regList){
  return res.status(500).json({success:false,msg:'no address found'})
  
}
  //  return res.status(201).json({type:regList.type,address:regList.address});
 return res.status(201).json(anss);

});

module.exports=router;