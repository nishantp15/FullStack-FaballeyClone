
async function AllQueriesFunction(queries){

    let QueryObject = {...queries};

    //---------------------------------- Pagination ---------------------------------------------
    let page = QueryObject.page || 1;
    let limit = Number(QueryObject.limit) || 20;

    let skip = Number(page-1)*Number(limit);
    QueryObject.skip= skip;
    QueryObject.limit = limit;

    //--------------------------------- Filter gte,lte, etc. -----------------------------------
     let QueryString = JSON.stringify(QueryObject)
     QueryString = QueryString.replace(/\b(gte|lte|gt|lt|eq)\b/g,(match)=>`$${match}`)
     QueryObject = JSON.parse(QueryString)

    // Genre Filter >>
    if(QueryObject.Genre){
        let GenreString = QueryObject.Genre.replaceAll(',','|');
        let RegexValue = new RegExp(GenreString,'gi');
        let Genre ={$regex:RegexValue} 
        QueryObject.Genre= Genre;
    }

    //------------------------ Query search ------------------------------------------------
    let{q} = QueryObject
    if(q!==null, q!==undefined){
        let arr  = q.split(' ');
        console.log(arr)
        if(arr.length>1){
            let a = new RegExp(arr[0],'gi')
            let b = new RegExp(arr[1],'gi');
            let Actors = {$regex:new RegExp(q,'gi')}
            QueryObject = {...QueryObject, $or:[{Actors},{Actors:{$regex:b}},{Title:{$regex:new RegExp(q,'gi')}},{Title:{$regex:b}}]}
        }else{
            let Actors = {$regex:new RegExp(q,'gi')}
            QueryObject = {...QueryObject, $or:[{Actors},{Title:new RegExp(q,'gi')}]}
        }
        delete QueryObject.q;
    }
    
    // ----------------------------------- Sorting ----------------------------------------------
    let SortingObject = {};
    let SortingArrayCheck = Array.isArray(QueryObject.Sort);

    if(QueryObject.Sort && SortingArrayCheck==true){
        let SortArray = QueryObject.Sort;
        SortArray.forEach((ele)=>{
            let a = ele.split(/[\(\)]+/g);
            let Order = a[0]==='asc' ? Number(a[0].replace(/\b(asc)\b/g,1)) : a[0]==='desc' ? Number(a[0].replace(/\b(desc)\b/g,-1)) : 0;
            let SortBy = a[1]
            SortingObject[SortBy]=Order;
        })
    }else if(QueryObject.Sort && SortingArrayCheck==false){
        let a = QueryObject.Sort.split(/[\(\)]+/g);
        let Order = a[0]==='asc' ? Number(a[0].replace(/\b(asc)\b/g,1)) : a[0]==='desc' ? Number(a[0].replace(/\b(desc)\b/g,-1)) : 0;
        let SortBy = a[1]
        SortingObject[SortBy]=Order;
    }

    QueryObject.Sort = SortingObject;

    // -----------------------------------------------------------------------------------------
    return QueryObject;
}

module.exports = {AllQueriesFunction};



