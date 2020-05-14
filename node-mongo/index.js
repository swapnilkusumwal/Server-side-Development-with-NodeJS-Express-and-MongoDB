const MongoClient= require('mongodb').MongoClient;
const assert=require('assert');
const dboper=require('./operations');
const url="mongodb://localhost:27017/";
const dbname='confusion';

MongoClient.connect(url).then((client)=>{
    console.log("Connected to server...\n");

    const db=client.db(dbname);
    
    dboper.insertDocument(db,{"name":"Vadonut","description":"test"},'dishes')
    .then((result)=>{
        console.log("Insert Document:\n",result.ops);

        return dboper.findDocuments(db,'dishes')
    })
    .then((docs)=>{
        console.log("Found documents:\n",docs);

        return dboper.updateDocument(db,{"name":"vadonut"},{"description":"Updated test"},'dishes')
    })
    .then((result)=>{
        console.log("Update document:\n",result.result);
        
        dboper.findDocuments(db,'dishes')
    })
    .then((docs)=>{
        console.log("Found documents:\n",docs);

        return db.dropCollection('dishes')
    })
    
    .then((result)=>{
            console.log("Dropper collection: "+result);
            client.close();
    })
    .catch((err)=>console.log(err));         
})
.catch((err)=>console.log(err));