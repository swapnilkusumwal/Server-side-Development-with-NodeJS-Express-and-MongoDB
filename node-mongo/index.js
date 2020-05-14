const MongoClient= require('mongodb').MongoClient;
const assert=require('assert');
const dboper=require('./operations');
const url="mongodb://localhost:27017/";
const dbname='confusion';

MongoClient.connect(url,(err,client)=>{
    assert.equal(err,null);

    console.log("Connected to server...\n");

    const db=client.db(dbname);
    
    dboper.insertDocument(db,{"name":"Vadonut","description":"test"},'dishes',(result)=>{
        console.log("Insert Document:\n",result.ops);

        dboper.findDocuments(db,'dishes',(docs)=>{
            console.log("Found documents:\n",docs);

            dboper.updateDocument(db,{"name":"vadonut"},{"description":"Updated test"},'dishes',(result)=>{
                console.log("Update document:\n",result.result);
                
                dboper.findDocuments(db,'dishes',(docs)=>{
                    console.log("Found documents:\n",docs);

                    db.dropCollection('dishes',(result)=>{
                        console.log("Dropper collection: "+result);
                        client.close();
                    })
                });
            });
        });
    });
});