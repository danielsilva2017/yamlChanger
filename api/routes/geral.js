const express = require('express');
const extend = require('extend')
const router = express.Router();
const kub = require('../../client')
const exec = require('child_process').exec;
const axios = require('axios');

var Client = require('node-kubernetes-client');
var fs = require('fs');

const state = require( './state.js' )
const queue = require('./queue.js')
function executeFeedback(){
    console.log("inside feedback");
    exec('rm agent.*.pickle', { cwd: './../deployment/' }, (error, stdout, stderr) => {
        if (error) throw error;
    });
    setTimeout(() => {
        console.log("finish")
    }, 2000);
    exec('./startagents.sh', { cwd: './../deployment/' }, (error, stdout, stderr) => {
        console.log( stdout, stderr ); 
       
        state.id="2"
        state.msg="2- A começar a monitorização"
        if (error) {
            console.log("oh")
            return;
        }
    });

    setTimeout(execFunction, 40000);
    setTimeout(execLoad, 120000);
    setTimeout(() => {
        console.log("finish")
    }, 200000);
}

function execFunction(){
    state.id="3"
    state.msg="3-A parar monitorização"
    exec('./stopagents.sh', { cwd: './../deployment/' }, (error, stdout, stderr) => {
        console.log( stdout, stderr ); 
        if (error) throw error
    });
}


function execLoad(){

    queue.id=0
    queue.currentLeft=0
    queue.number=0
    state.id="4"
    state.msg="4-A lançar dados para neo4j"
    exec('./loadresults.sh --clear --k8s services.txt agent.*.pickle > /dev/null 2>&1', { cwd: './../deployment/',stdio: ['pipe', 'pipe', 'ignore']}, (error, stdout, stderr) => {
        console.log( stdout, stderr ); 
        if (error) throw error
    });
    
}
function delay ( time ) {
    return new Promise( resolve => setTimeout( resolve, time ) )
}

router.post('/queue',async(req,res,next)=>{
    console.log("just entered queue")
    try{ 
        var a = req.body.data
        queue.number = req.body.data.length
        queue.currentLeft=0
        for(let key of a){
            await axios.post(key).then(response => 
            {
                console.log('inside queue')
            } )
            queue.currentLeft=queue.currentLeft+1;
            await delay(20000);
        }}catch(err){
            console.log(err)
        }
        console.log('outside loop')
    console.log("before feedback");
    executeFeedback()
});

router.get('/state/',(req,res,next)=>{
    
    res.status(200).json(state)
   
});

router.get('/queue/',(req,res,next)=>{
    res.status(200).json(queue)
   
});
module.exports = router;