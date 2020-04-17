const express = require('express');
const extend = require('extend')
const router = express.Router();
const kub = require('../../client')
const exec = require('child_process').exec;


var Client = require('node-kubernetes-client');

state=0

function startAgent(){
    state=1
    exec('./startagents.sh', { cwd: './../deployment/' }, (error, stdout, stderr) => {
        console.log("starting")
        console.log( stdout, stderr ); 
       
        if (error) {
            console.log("oh")
            return;
        }
    });
}


function stopAgent(){
    exec('./stopagents.sh', { cwd: './../deployment/' }, (error, stdout, stderr) => {
        console.log( stdout, stderr ); 
       
        if (error) {
            console.log("oh")
            return;
        }
    });
    state=0
}


router.post('/start',(req,res,next)=>{
    console.log("start")
    startAgent()

});


router.post('/stop',(req,res,next)=>{
    console.log("stop")
    stopAgent()

});

router.get('/state',(req,res,next)=>{
    res.status(200).json(state)
   
});

module.exports = router;