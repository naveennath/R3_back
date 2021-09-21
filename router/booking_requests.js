const {Booking_request}=require('../models/booking_request');
const {Booking_confirm}=require('../models/booking_confirm');

const express=require('express');
const app = express();
const router= express.Router(); 
const bcrypt =require('bcryptjs');


router.get('/', async (req, res) => {
const regList =  await Booking_request.find();
if(!regList){
  return res.status(500).json({success:false})
}
 return res.send(regList);
});


// router.get('/notBooked', async (req, res) => {
//   var cot;
//   Booking_confirm.count( {}, function(err, result){

//         if(err){
//             res.send(err)
//         }
        
//               console.log(result);
        

//    })


// const regList =  await Booking_confirm.find({isBooked:true}).select('booking_request');

// // const ans=regList.booking_request.toString();
// // for(const i in regList)
// //     console.log(i["booking_request"]);
// console.log(regList);
// // console.log(ans);


// if(!regList){
//   return res.status(500).json({success:false,msg:'no address found'})
  
// }
//   //  return res.status(201).json({type:regList.type,address:regList.address});
//  return res.send(regList);

// });

router.get('/reqq', async (req, res) => {
  
const regList =  await Booking_request.find({isBooked:false}).select('garbage_type quantity address');


if(!regList){
  return res.status(500).json({success:false,msg:'no address found'})
  
}
  //  return res.status(201).json({type:regList.type,address:regList.address});
 return res.send(regList);

});


router.get('/:email', async (req, res) => {
  
const regList =  await Booking_request.find({email:req.params.email}).select('garbage_type quantity address');


if(!regList){
  return res.status(500).json({success:false,msg:'no address found'})
  
}
  //  return res.status(201).json({type:regList.type,address:regList.address});
 return res.send(regList);

});



router.post('/', async (req, res) => {
  
    const{email,garbage_type,quantity,address}=req.body;
    //    const admin = await Address_data.findOne({email:email});
    // console.log(admin);



const booking_request=new Booking_request({
 
  email:req.body.email,
  garbage_type:req.body.garbage_type,
  quantity:req.body.quantity,
  address:req.body.address,
   isBooked:req.body.isBooked,

  
})
// console.log(reg.repass);

await booking_request.save().then((createdBooking_request=> {
  return res.status(201).json({
    name:booking_request.name
  })
})).catch((err)=>{
  return res.status(500).json({
  error:err,
  success:false
  })
})


  
});

router.delete('/:email', async(req, res)=>{
    
        const ress=await Booking_request.findOne({email:req.params.email,garbage_type:req.body.garbage_type});
    const ans=ress._id.toString();
    Booking_request.findByIdAndRemove(ans).then(reg =>{
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