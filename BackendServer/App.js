const express = require('express');
const cors = require('cors');
const router = require('./Router/ProductsRouter');
const Cartrouter = require('./Router/CartRouter')
const ConnectToDB = require('./Database/ConnectToDB');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequest);
app.use(cors());
app.use('/products',router);
app.use('/cart',Cartrouter);

async function logRequest(req,res,next){
    console.log(new Date, req.method, req.url);
    next();
}

ConnectToDB().then(()=>{
    app.listen(3030,()=>{
        console.log('Listening on 3030')
    })
}).catch();
