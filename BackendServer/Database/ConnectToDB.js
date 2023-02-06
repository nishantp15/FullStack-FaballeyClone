const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
async function ConnectToDB(){
    return await mongoose.connect('mongodb://127.0.0.1:27017/faballey')
}
module.exports = ConnectToDB;

//cors mongoose express