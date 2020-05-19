const express = require('express');
const bodyParser = require('body-parser');
const authenticate=require('../authenticate');
const Favorites=require('../models/favorites');
const cors=require('./cors');
const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.get(cors.cors,authenticate.verifyUser,(req,res,next) => {
    Favorites.find({})
    .populate('user')
    .populate('dishes')
    .then((favorites)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(favorites);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Favorites.findOne({user:req.user._id})
    .then((favorites)=>{
        if(favorites===null){
            let arr=[];
            for(var i =0;i<req.body.length;i++){
                if(arr.indexOf(req.body[i]._id)===-1)
                    arr.push(req.body[i]._id);
            }
            Favorites.create({user:req.user._id,dishes:arr})
            .then((favorite)=>{
                console.log(favorite.dishes);
                res.statusCode=200;
                res.setHeader("Content-Type","application/json");
                res.send(favorite);
            },(err)=>next(err))
            .catch((err)=>next(err))
        }
        else{
            for (var i=0; i<req.body.length; i++) {
                if (favorites.dishes.indexOf(req.body[i]._id) === -1) {
                    favorites.dishes.push(req.body[i]);
                    console.log(req.body[i]);
                }
            }
            favorites.save()
            .then((favorite)=>{
                res.statusCode=200;
                res.setHeader("Content-Type","application/json");
                res.send(favorite);
            },(err)=>next(err))
            .catch((err)=>next(err))
        }
    },(err)=>next(err))
    .catch(err=>next(err))
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.send("PUT not supported on /favorites");
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Favorites.findOneAndRemove({user:req.user._id})
    .then((favorite)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.send(favorite);
    },(err)=>next(err))
    .catch((err)=>next(err))
});

favoriteRouter.route('/:favoriteId')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.get(cors.cors,authenticate.verifyUser,(req,res,next) => {
    res.statusCode = 403;
    res.send("GET not supported on /favorites/:favoritesId");
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Favorites.findOne({user:req.user._id})
    .then((favorites)=>{
        if(favorites===null){
            Favorites.create({user:req.user._id,dishes:req.params.favoriteId})
            .then((favorite)=>{
                res.statusCode=200;
                res.setHeader("Content-Type","application/json");
                res.send(favorite);
            },(err)=>next(err))
            .catch((err)=>next(err))
        }
        else{
            if (favorites.dishes.indexOf(req.params.favoriteId) === -1) 
                favorites.dishes.push(req.params.favoriteId);
            favorites.save()
            .then((favorite)=>{
                res.statusCode=200;
                res.setHeader("Content-Type","application/json");
                res.send(favorite);
            },(err)=>next(err))
            .catch((err)=>next(err))
        }
    },(err)=>next(err))
    .catch(err=>next(err))
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.send("PUT not supported on /favorites/:favoritesId");
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Favorites.findOne({user:req.user._id})
    .then((favorite)=>{
        if(favorite){
            if(favorite.dishes.indexOf(req.params.favoriteId)!==-1)
            {
                favorite.dishes.splice(favorite.dishes.indexOf(req.params.favoriteId),1);
                favorite.save()
                .then((favorites)=>{
                    Favorites.findOne({_id:favorite._id})
                    .populate('users')
                    .populate('dishes')
                    .then((favorite1)=>{
                        res.statusCode=200;
                        res.setHeader('Content-Type','application/json');
                        res.json(favorite1);
                    },(err)=>next(err))
                    .catch((err)=>next(err))
                },(err)=>next(err))
                .catch((err)=>next(err))
            }
            else {
                err= new Error('Dish '+req.params.favoriteId+' not found');
                err.status=404;
                return next(err);
            }
        }
        else {
            err= new Error('Favorites do not exist');
            err.status=404;
            return next(err);
        }
        
        
    },(err)=>next(err))
    .catch((err)=>next(err))
});
module.exports=favoriteRouter;