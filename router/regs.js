const {Reg}=require('../models/reg');
const express=require('express');
const app = express();
const router= express.Router(); 
const bcrypt =require('bcryptjs');

router.get('/nopass', async (req, res) => {
const regList =  await Reg.find().select('-pass');
if(!regList){
  return res.status(500).json({success:false})
}
 return res.send(regList);
});

router.get('/', async (req, res) => {
const regList =  await Reg.find();
if(!regList){
  return res.status(500).json({success:false})
}
 return res.send(regList);
});

router.get(`/get/count`, async (req, res) =>{
    const userCount = await Reg.countDocuments((count) => count)

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
const user =  await Reg.findOne({email:req.body.email});
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
       const admin = await Reg.findOne({email:email});
    console.log(admin);
    if(!email ||!name||!pass||!phone)
            return res.status(201).json({msg: "Fill all the fields"})
        
     
      
         else if(admin)
            return res.status(201).json({msg:"Aldready registered"})

 else{


const reg=new Reg({
  name: req.body.name,
  email:req.body.email,
  pass:bcrypt.hashSync(req.body.pass,10),
  
  phone:req.body.phone
})
// console.log(reg.repass);

await reg.save().then((createdReg=> {
  return res.status(201).json({
    name:reg.name
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
    const reg = await Reg.findById(req.params.id);

    if(!reg) {
        res.status(500).json({message: 'The reg with the given ID was not found.'});
    } 
    res.status(200).send(reg);
});

router.get('/get/:email', async(req,res)=>{
  const email=req.params.email;
  console.log(email);
    const rg = await Reg.findOne({email:email});

    if(!rg) {
        return res.status(500).json({message: 'The reg with the given email was not found.'});
    } 
     return res.status(200).json({email:email});
});

router.put('/:email',async (req, res)=> {
   
    const reg = await Reg.findOneAndUpdate(
     
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
    const reg = await Reg.findByIdAndUpdate(

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
    Reg.findByIdAndRemove(req.params.id).then(reg =>{
        if(reg) {
            return res.status(200).json({success: true, message: 'the reg is deleted!'});
        } else {
            return res.status(404).json({success: false , message: "reg not found!"});
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) ;
    });
});



app.options('/', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
}) 
router.delete('/', async(req, res)=>{
    const emai=req.body.email;
        const ress=await Reg.findOne({email:emai});
    const ans=ress._id.toString();
    Reg.findByIdAndRemove(ans).then(reg =>{
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