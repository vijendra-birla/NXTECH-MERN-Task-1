require('dotenv').config() ; 
const express = require('express') ;
const app  = express() ;
const mongoose = require('mongoose') ;
require('./database/connection');
require('./models/userSchema')
const bodyParser = require('body-parser') ;
const cors = require('cors') ;
const transaction = require('./models/userSchema')

const PORT = 4040 ;

app.use(cors()) ;
app.use(bodyParser.json()) ;

app.listen(PORT,()=>{
    console.log(`Server Is Runing On Port :${PORT}`) ;
})

app.get('/',(req,res)=>{
    res.send('Hello User')
})

app.post("/transaction",(req,res)=>{
    const {name,price,datetime,description}= req.body ;
    const data = transaction({name,price,datetime,description})
    data.save() ;
    res.json({"message" : "Success"})
})

app.get('/transactions',async(req,res)=>{
    const data = await transaction.find();
    res.json({'transactions':data}) ;
})
 
app.delete('/deleteblog/:id',async(req,res)=>{
    let objid = req.params.id ;
    const result = await transaction.findOneAndDelete({_id :objid}) ;
    if(result){
     res.json({'delmsg':'transaction Deleted'}) ;
    }
 })

