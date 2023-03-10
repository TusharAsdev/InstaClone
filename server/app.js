const express = require('express');
const app =express();
const PORT = 5000;
const mongoose = require('mongoose');
const {MONGOURI} = require('./keys.js');

mongoose.set('strictQuery', true);
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    
})

mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})
require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.get('/',(req,res) =>{
    res.send("hello world!!")
});
 
app.listen (PORT,()=>{
    console.log("server is running on",PORT)
})