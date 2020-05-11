const express=require('express');
const http=require('http');
const morgan=require('morgan');
const hostname='localhost';
const port='3000';
const bodyParser=require('body-parser');
const app=express();
const dishRouter=require('./routes/dishRouter');

app.use(morgan('dev'));

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

app.use('/dishes',dishRouter);


app.use((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port,hostname,()=>{
    console.log(`Server runnning at http://${hostname}:${port}`);
});
