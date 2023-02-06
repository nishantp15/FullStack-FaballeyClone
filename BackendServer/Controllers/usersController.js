const {users} = require('../Database/UserSchema')
const jwt = require('jsonwebtoken');

async function register(req, res){
    try{
        const{name, email, password,confirmPassword} = req.body;

        const alreadyExisting = await users.findOne({email});
        if(alreadyExisting){
            return res.status(500).send({message:'User with email already exist'});
        }

        const createUser = await users.create({name, email, password,confirmPassword});
        return res.status(200).send({message:'Registered Successfully'});

    }catch(err){
        res.status(500).send({message:'Something went wrong'});
    }
}

function GenerateToken(FindUser){
    let{_id, name, email} = FindUser;
    return jwt.sign({_id, name, email},'kjjb654j3kkn29dv866s9fda5fkjsd67asd56')
}


async function login(req, res){
    try{
        const {email, password} = req.body;

        let FindUser = await users.findOne({email});
        if(!FindUser){
            return res.send('user does not exist');
        }

        if(password!==FindUser.password){
            return res.send('wrong password');
        }
        const token = GenerateToken(FindUser);

        return res.status(200).send({message:'Successful', UserDetail:{token}})

    }catch(err){
        res.status(500).send({message:'Something went wrong'});
    }
}

async function loggedinUser(req, res){
try{
let FindUser = req.userFind;
// localStorage.setItem('userID',FindUser._id.data.id);
return res.send({data:FindUser})
}catch(err){
    res.status(500).send({message:'Something went wrong'});
}
}

module.exports = {register, login, loggedinUser}