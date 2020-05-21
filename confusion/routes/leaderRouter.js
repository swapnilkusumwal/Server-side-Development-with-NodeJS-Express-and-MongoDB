const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
var leaders=require('../models/leaders');
var authenticate=require('../authenticate');
var cors=require('./cors');
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

leaderRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.get(cors.cors,(req,res,next) => {
    leaders.find(req.query)
    .then((leaders)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.send(leaders);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    leaders.create(req.body)
    .then((leader)=>{
        console.log('Leader created ',leader);
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    leaders.deleteMany({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err))
});

leaderRouter.route('/:leaderId')
.get(cors.cors,(req,res,next) => {
    leaders.findById(req.params.leaderId)
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.send(leader);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.end('Post not supported on /leaders/ '+req.params.leaderId);
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    leaders.findByIdAndUpdate(req.params.leaderId,
        {$set:req.body},
        {new:true}
    )
    .then((leaders)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.send(leaders);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err))
});

module.exports = leaderRouter;