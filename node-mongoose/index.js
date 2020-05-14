const mongoose=require('mongoose');

const Dishes=require('./models/dishes');

const url="mongodb://localhost:27017";

const connect=mongoose.connect(url,{useNewUrlParser: true,useFindAndModify: false});

connect.then((db)=>{
    console.log('Connected correctly to server');
    
    Dishes.create({
        name:"Uthappizza",
        description:"test"
    })
    .then((dish)=>{
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id,{
            $set:{description:"updated test"}
        },{
            new:true 
        }).exec();
        //new : true ->this will return the dish back to us
    })
    .then((dish)=>{
        console.log(dish);
        dish.comments.push({
            rating:5,
            comment: "I\'m getting a sinking feeling!",
            author: "Myself"
        });
        return dish.save();
    })
    .then((dish)=>{
        console.log(dish);
        return Dishes.deleteMany({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err);
    });
});