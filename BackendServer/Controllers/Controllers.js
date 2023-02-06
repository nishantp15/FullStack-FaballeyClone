const {products} = require('../Database/ProductsSchema')
const {AllQueriesFunction} = require('./Queries')

async function GetProductsData(queries){

    // 1st method ----------------------------------------------------------------------------


    /*------------------------------------ 2nd method ----------------------------------------*/
    let AllQueries = await AllQueriesFunction(queries);

    let AvoidFields = ['page','skip','limit',"Sort"];
    let FilterQueryObject = {...AllQueries};
    AvoidFields.forEach((ele=>[
        delete FilterQueryObject[ele]
    ]))
 
    //-------------------------------------- Final Op -------------------------------------------
    
    let data = products.find(FilterQueryObject).sort(AllQueries.Sort) 
                .skip(AllQueries.skip).limit(AllQueries.limit);
   
    return await data;
}



//===================================******* Post Data *********=================================

async function CreateData(data){
    return await products.create({
        ...data
    })
}


//===================================******* Patch Data *********=======================================================

async function UpdateData(id,data){
    await products.findByIdAndUpdate(id,{$set:{
        ...data
    }})

    const UpadatedData = await products.findById(id);
    return UpadatedData;
}

async function DeleteData(id){
    const DeletedData = await movies.findById(id);
    await products.findByIdAndDelete(id);
    return DeletedData;
}

module.exports = {GetProductsData,CreateData, UpdateData, DeleteData};