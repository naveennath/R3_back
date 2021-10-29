const express = require('express');
const app = express();
const  bodyParser = require('body-parser');
const morgan= require('morgan');
const mongoose=require('mongoose');
const Reg=require('./models/reg');
const regsRouter=require('./router/regs');

const Reg_pick=require('./models/reg_pick');
const reg_picksRouter=require('./router/reg_picks');

const Reg_colle=require('./models/reg_colle');
const reg_collesRouter=require('./router/reg_colles');

const Address_data=require('./models/address_data');
const address_datasRouter=require('./router/address_datas');

const Vehicle=require('./models/vehicle');
const vehiclesRouter=require('./router/vehicles');

const Coin=require('./models/coin');
const coinsRouter=require('./router/coins');

const Booking_request=require('./models/booking_request');
const booking_requestsRouter=require('./router/booking_requests');

const Collection=require('./models/collection');
const collectionsRouter=require('./router/collections');

const Booking_confirm=require('./models/booking_confirm');
const booking_confirmsRouter=require('./router/booking_confirms');
const userconfirmsRouter=require('./router/userconfirms');

const verifyRouter=require('./router/verify');

const cors=require('cors');


app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*',cors());




const dotenv = require('dotenv');
dotenv.config();
console.log(`Your port is ${process.env.API_URL}`);

// http://localhost:3000/api/v1/products
const api=process.env.API_URL;
console.log(api+'/products');



app.use(api+'/regs',regsRouter)
app.use(api+'/verify',verifyRouter)
app.use(api+'/reg_picks',reg_picksRouter)
app.use(api+'/reg_colles',reg_collesRouter)
app.use(api+'/address_datas',address_datasRouter)
app.use(api+'/vehicles',vehiclesRouter)
app.use(api+'/collections',collectionsRouter)
app.use(api+'/coins',coinsRouter)
app.use(api+'/booking_requests',booking_requestsRouter)
app.use(api+'/userconfirms',userconfirmsRouter)
app.use(api+'/booking_confirms',booking_confirmsRouter)


mongoose.connect(process.env.CONN_STRING,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  dbName:'naveen-db'
})
.then(()=>{
  console.log('CONNECTED');
})
.catch((err)=>{
  console.log(err);
})
// app.listen(3000, () => {
  
//   console.log('server is running in http://localhost:3000');
// });

var server =app.listen(process.env.PORT || 3000, function(){
          server.setTimeout(60 * 1000);

  
  var port = server.address().port;
console.log("Express is Working on port "+ port)
})