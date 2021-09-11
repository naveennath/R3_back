const express = require('express');
const app = express();
const  bodyParser = require('body-parser');
const morgan= require('morgan');
const mongoose=require('mongoose');
const Product=require('./models/product');
const productsRouter=require('./router/products');
const Reg=require('./models/reg');
const regsRouter=require('./router/regs');
const cors=require('cors');


app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*',cors())



const dotenv = require('dotenv');
dotenv.config();
console.log(`Your port is ${process.env.API_URL}`);

// http://localhost:3000/api/v1/products
const api=process.env.API_URL;
console.log(api+'/products');


app.use(api+'/products',productsRouter)
app.use(api+'/regs',regsRouter)

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
app.listen(3000, () => {
  
  console.log('server is running in http://localhost:3000');
});
