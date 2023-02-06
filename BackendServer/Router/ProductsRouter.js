const { query } = require('express');
const express = require('express');

const{GetProductsData,CreateData, UpdateData, DeleteData} = require('../Controllers/Controllers')

const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        let queries ={...req.query};
        
        const getData = await GetProductsData(queries);
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

router.post('/',async(req,res)=>{
    try{
        const CreatedData = await CreateData(req.body);
        res.send({
            AddedData:CreatedData
        });
    }
    catch(err){
        res.status(401).send(err)
        console.log(err);
    }
})

router.patch('/:id',async(req, res)=>{
    try{
       let Data =  await UpdateData(req.params.id, req.body);
        res.send({
            UpdatedData:Data
        })
    }
    catch(err){
        res.status(401).send(err)
        console.log(err);
    }
})

router.delete('/:id',async(req,res)=>{
    try{
      let data =  await DeleteData(req.params.id);
      res.send({
        Deleted:data
      })
    }
    catch(err){
        res.status(401).send(err)
        console.log(err);
    }
})

router.get('*',async(req,res)=>{
    res.status(404).send({
        error:404,
        message:`Unknown path`
    })
})


module.exports = router;

