
const express = require('express');

const{GetCartData,CreateData, UpdateData, DeleteData} = require('../Controllers/CartControllers')

const Cartrouter = express.Router();

Cartrouter.get('/',async(req,res)=>{
    try{
        const getData = await GetCartData();
        res.send(getData); 
    }
    catch(err){
        res.status(404).send({
                status:"Failure",
                error:err.message
            })
        console.error(err);
    }
})

Cartrouter.post('/',async(req,res)=>{
    try{
        const CreatedData = await CreateData(req.body);
        res.send(CreatedData);
    }
    catch(err){
        res.status(401).send(err)
        console.log(err);
    }
})

Cartrouter.patch('/:id',async(req, res)=>{
    try{
       let Data =  await UpdateData(req.params.id, req.body);
        res.send(Data)
    }
    catch(err){
        res.status(401).send(err)
        console.log(err);
    }
})

Cartrouter.delete('/:id',async(req,res)=>{
    try{
      let data =  await DeleteData(req.params.id);
      res.send(data)
    }
    catch(err){
        res.status(401).send(err)
        console.log(err);
    }
})

Cartrouter.get('*',async(req,res)=>{
    res.status(404).send({
        error:404,
        message:`Unknown path`
    })
})


module.exports = Cartrouter;

