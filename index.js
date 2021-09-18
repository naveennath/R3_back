// const { Auth, LoginCredentials } = require("two-step-auth");

// async function login(emailId) {
// try {
// 	const res = await Auth(emailId, "r3");
// 	console.log(res);
// 	console.log(res.mail);
// 	console.log(res.OTP);
// 	console.log(res.success);
// } catch (error) {
// 	console.log(error);
// }
// }

// // This should have less secure apps enabled
// LoginCredentials.mailID = "finalyear.r3@gmail.com";

// // You can store them in your env variables and
// // access them, it will work fine
// LoginCredentials.password = "harinaveennobil";
// LoginCredentials.use = true;

// login("c.naveennath@gmail.com");

const express=require('express');
const bodyparser=require('body-parser');
const nodemailer=require('nodemailer');
const path=require('path');
const exphbs=require('express-handlebars');
const async = require('async');

// initialize redis
const redis = require("redis");
const client = redis.createClient({
    host: 'localhost',
    port: 6379
});
 
client.on("error", function(error) {
  console.error(error);
});


const app=express();

// view engine setup
app.engine('handlebars',exphbs({ extname: "hbs", defaultLayout: false, layoutsDir: "views/ "}));
app.set('view engine','handlebars');

// body parser middleware
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

//static folder
app.use('/public',express.static(path.join(__dirname, 'public')));


app.get('/',function(req,res){
    res.render('contact');
});

var email;

// var otp = Math.random();
// otp = otp * 1000000;
// otp = parseInt(otp);
// console.log(otp);

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service : 'Gmail',
    
    auth: {
      user: 'finalyear.r3@gmail.com',
      pass: 'harinaveennobil',
    }
    
});
    
app.post('/send',function(req,res){
    email=req.body.email;
    
    // generate the otp
    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    console.log(otp);

    // set otp in redis (with email as key) with expiration time(5 mins)
    client.setex(req.body.email, 3000000, otp);


     // send mail with defined transport object
    var mailOptions={
       to: req.body.email,
       subject: "Otp for registration is: ",
       html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };
     
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('otp');
    });
});

app.post('/verify',function(req,res){

    // check if otp exists in redis (else send message otp expired)
    client.keys('*', (err, keys) => {
        if (err) res.render('otp',{msg : 'An error occurred!'});
        if(keys){
            console.log(keys.length);
            
            let flag = 0;
            for(let i = 0; i<keys.length; i++){
                client.get(keys[i], (err, value) => {

                    if (err) res.render('otp',{msg : 'An error occurred!'});

                    if(value === req.body.otp){
                        flag = 1;
                        res.send("You have been successfully registered");
                    }
                });
            }

            if(flag === 0)
                res.render('otp',{msg : 'Incorrect OTP!'});

 
        }else{
            res.render('otp',{msg : 'Error fetchin OTP!'});
        }
    });
 
});  

const PORT=process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
})