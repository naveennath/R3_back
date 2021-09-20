const {Address_data}=require('../models/address_data');
const express=require('express');
const app = express();
const router= express.Router(); 
const bcrypt =require('bcryptjs');


router.get('/', async (req, res) => {
const regList =  await Address_data.find();
if(!regList){
  return res.status(500).json({success:false})
}
 return res.send(regList);
});


router.get('/:email', async (req, res) => {
  
const regList =  await Address_data.find({email:req.params.email}).select('type address');


if(!regList){
  return res.status(500).json({success:false,msg:'no address found'})
  
}
  //  return res.status(201).json({type:regList.type,address:regList.address});
 return res.send(regList);

});



router.post('/', async (req, res) => {
  
    const{email,address,type}=req.body;
    //    const admin = await Address_data.findOne({email:email});
    // console.log(admin);



const address_data=new Address_data({
 
  email:req.body.email,
  address:req.body.address,
  type:req.body.type,
})
// console.log(reg.repass);

await address_data.save().then((createdAddress_data=> {
  return res.status(201).json({
    name:Address_data.name
  })
})).catch((err)=>{
  return res.status(500).json({
  error:err,
  success:false
  })
})


  
});

router.put('/:email',async (req, res)=> {
   const ress=await Address_data.findOne({email:req.params.email,type:req.body.type});
    const ans=ress._id.toString();
    console.log(ans);
    console.log(req.params.email);
    const reg = await Address_data.findByIdAndUpdate(
     
        ans,
        {
           
  type:req.body.type,  
  address:req.body.address,

        },
        { new: true}
     
    )
 
     res.send(reg);
   

});


router.delete('/:email', async(req, res)=>{
    
        const ress=await Address_data.findOne({email:req.params.email,type:req.body.type});
    const ans=ress._id.toString();
    Address_data.findByIdAndRemove(ans).then(reg =>{
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