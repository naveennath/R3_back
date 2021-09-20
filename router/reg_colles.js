const {Reg_colle}=require('../models/reg_colle');
const express=require('express');
const app = express();
const router= express.Router(); 
const bcrypt =require('bcryptjs');

router.get('/nopass', async (req, res) => {
const regList =  await Reg_colle.find().select('-pass');
if(!regList){
  return res.status(500).json({success:false})
}
 return res.send(regList);
});

router.get('/', async (req, res) => {
const regList =  await Reg_colle.find();
if(!regList){
  return res.status(500).json({success:false})
}
 return res.send(regList);
});

router.get(`/get/count`, async (req, res) =>{
    const userCount = await Reg_colle.countDocuments((count) => count)

    if(!userCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        userCount: userCount
    });
})


app.options('/login', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});
router.post('/login', async (req, res) => {
const user =  await Reg_colle.findOne({email:req.body.email});
if(!user){
  return res.status(201).json({msg:"the user not found"});
}
if(user && (bcrypt.compareSync(req.body.pass,user.pass))){
 
return res.status(201).json({name: user.name, email:user.email});
}
else{
  return res.status(201).json({msg:"password is wrong"});
}
  
});

router.post('/', async (req, res) => {
  
    const{name,email,pass,phone}=req.body;
       const admin = await Reg_colle.findOne({email:email});
    console.log(admin);
    if(!email ||!name||!pass||!phone)
            return res.status(201).json({msg: "Fill all the fields"})
        
     
      
         else if(admin)
            return res.status(201).json({msg:"Aldready registered"})

 else{


const reg_colle=new Reg_colle({
  name: req.body.name,
  email:req.body.email,
  pass:bcrypt.hashSync(req.body.pass,10),
  
  phone:req.body.phone
})
// console.log(reg.repass);

await reg_colle.save().then((createdReg_colle=> {
  return res.status(201).json({
    name:reg_colle.name
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
    const reg_colle = await Reg_colle.findById(req.params.id);

    if(!reg_colle) {
        res.status(500).json({message: 'The reg with the given ID was not found.'});
    } 
    res.status(200).send(reg);
});

router.put('/:email',async (req, res)=> {
   
    const reg = await Reg_colle.findOneAndUpdate(
     
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
    const reg = await Reg_colle.findByIdAndUpdate(

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
    Reg_colle.findByIdAndRemove(req.params.id).then(reg =>{
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