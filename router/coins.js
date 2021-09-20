const {Coin}=require('../models/coin');
const express=require('express');
const app = express();
const router= express.Router(); 
const bcrypt =require('bcryptjs');


router.get('/', async (req, res) => {
const regList =  await Coin.find();
if(!regList){
  return res.status(500).json({success:false})
}
 return res.send(regList);
});


router.get('/:email', async (req, res) => {
  
const regList =  await Coin.find({email:req.params.email}).select('value');


if(!regList){
  return res.status(500).json({success:false,msg:'no address found'})
  
}
  //  return res.status(201).json({type:regList.type,address:regList.address});
 return res.send(regList);

});



router.post('/', async (req, res) => {
  
    const{email,value}=req.body;
    //    const admin = await Address_data.findOne({email:email});
    // console.log(admin);



const coin=new Coin({
 
  email:req.body.email,
  value:req.body.value,
})
// console.log(reg.repass);

await coin.save().then((createdCoin=> {
  return res.status(201).json({
    name:coin.name
  })
})).catch((err)=>{
  return res.status(500).json({
  error:err,
  success:false
  })
})


  
});

router.put('/:email',async (req, res)=> {
   const ress=await Coin.findOne({email:req.params.email});
    const ans=ress._id.toString();
    console.log(ans);
    console.log(req.params.email);
    const reg = await Coin.findByIdAndUpdate(
     
        ans,
        {
        value:req.body.value,
        },
        { new: true}
     
    )
 
     res.send(reg);
   

});


router.delete('/:email', async(req, res)=>{
    
        const ress=await Coin.findOne({email:req.params.emailS});
    const ans=ress._id.toString();
    Coin.findByIdAndRemove(ans).then(reg =>{
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