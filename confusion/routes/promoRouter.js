const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
var promotions=require('../models/promotions');
var authenticate=require('../authenticate');
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req,res,next) => {
    promotions.find({})
    .then((promos)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.send(promos);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    promotions.create(req.body)
    .then((promo)=>{
        console.log('Promo created ',promo);
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    promotions.deleteMany({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err))
});

promoRouter.route('/:promoId')
.get((req,res,next) => {
    promotions.findById(req.params.promoId)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.send(promo);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.end('Post not supported on /promotions/ '+req.params.promoId);
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    promotions.findByIdAndUpdate(req.params.promoId,
        {$set:req.body},
        {new:true}
    )
    .then((promos)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.send(promos);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    promotions.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err))
});

module.exports = promoRouter;