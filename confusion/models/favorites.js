var mongoose=require('mongoose');
const Schema =mongoose.Schema;

const favoriteSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dishes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'dish'
    }]
},{
    timestamps:true
});

var Favorites=mongoose.model('favorite',favoriteSchema);
module.exports=Favorites;