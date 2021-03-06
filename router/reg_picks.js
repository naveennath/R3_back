const {Reg_pick}=require('../models/reg_pick');
const express=require('express');
const app = express();
const router= express.Router(); 
const bcrypt =require('bcryptjs');

router.get('/nopass', async (req, res) => {
const regList =  await Reg_pick.find().select('-pass');
if(!regList){
  return res.status(500).json({success:false})
}
 return res.send(regList);
});

router.get('/', async (req, res) => {
const regList =  await Reg_pick.find();
if(!regList){
  return res.status(500).json({success:false})
}
 return res.send(regList);
});

router.get(`/get/count`, async (req, res) =>{
    const userCount = await Reg_pick.countDocuments((count) => count)

    if(!userCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        userCount: userCount
    });
})

router.get('/get/:email', async(req,res)=>{
  const email=req.params.email;
  console.log(email);
    const rg = await Reg_pick.findOne({email:email});

    if(!rg) {
        return res.status(500).json({message: 'The reg with the given email was not found.'});
    } 
     return res.status(200).send(rg);
});

app.options('/login', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});
router.post('/login', async (req, res) => {
const user =  await Reg_pick.findOne({email:req.body.email});
if(!user){
  return res.status(201).json({msg:"First Kindly Register"});
}
if(user && (bcrypt.compareSync(req.body.pass,user.pass))){
 
return res.status(201).json({name: user.name, email:user.email});
}
else{
  return res.status(201).json({msg:"Invalid Credentials"});
}
  
});

router.post('/', async (req, res) => {
  
    const{name,email,pass,phone}=req.body;
       const admin = await Reg_pick.findOne({email:email});
    console.log(admin);
    if(!email ||!name||!pass||!phone)
            return res.status(201).json({msg: "Fill all the fields"})
        
     
      
         else if(admin)
            return res.status(201).json({msg:"Aldready registered"})

 else{


const reg_pick=new Reg_pick({
  name: req.body.name,
  email:req.body.email,
  pass:bcrypt.hashSync(req.body.pass,10),
  
  phone:req.body.phone
})
// console.log(reg.repass);

await reg_pick.save().then((createdReg_pick=> {
  return res.status(201).json({
    name:reg_pick.name
  })
})).catch((err)=>{
  return res.status(500).json({
  error:err,
  success:false
  })
})
}
  
  
});

router.get('/:id', async(req,res)=>{
    const reg_pick = await Reg_pick.findById(req.params.id);

    if(!reg_pick) {
        res.status(500).json({message: 'The reg with the given ID was not found.'});
    } 
    res.status(200).send(reg);
});

router.put('/:email',async (req, res)=> {
   
    const reg = await Reg_pick.findOneAndUpdate(
     
        req.params.email,
        {
           name: req.body.name,
  email:req.body.email,
  pass:req.body.pass,
  repass:req.body.repass,
  phone:req.body.phone
        },
        { new: true}
     
    )
 
      if(req.body.pass==req.body.repass){
            res.send(reg);
        }
      else{
         res.status(500).json({message: 'The pass was not matched.'});
      }
   

});

router.put('/:id',async (req, res)=> {
    const reg = await Reg_pick.findByIdAndUpdate(

        req.params.id,
        {
           name: req.body.name,
  email:req.body.email,
  pass:req.body.pass,
  repass:req.body.repass,
  phone:req.body.phone
        },
        { new: true}
    )

    if(!reg)
    return res.status(400).send('the reg cannot be created!');

    res.send(reg);
});

router.delete('/:id', (req, res)=>{
    Reg_pick.findByIdAndRemove(req.params.id).then(reg =>{
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