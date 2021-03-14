const express = require('express');
const extend = require('extend')
const router = express.Router();
const kub = require('../../client')
var Client = require('node-kubernetes-client');
var fs = require('fs');
const exec = require('child_process').exec;

const state = require( './state.js' )

var client = new Client({
    protocol: 'http',
    host: '127.0.0.1:8001',
    version: 'apps/v1',
    reqOptions: {}
});

client.deployments = client.createCollection('statefulsets',null,null,{ apiPrefix : 'apis',namespaced: true});


router.get('/',(req,res,next)=>{
    client.deployments.get( function (err, data) {
        if(!err){
            res.status(200).json(data)
        }
        else{
            console.log("Error"+JSON.stringify(err))
        }
    });
});

router.get('/state/state/state',(req,res,next)=>{
    res.status(200).json(state)
   
});


router.get('/:deployment/:namespace',(req,res,next)=>{
    const name = req.params.deployment
    var clientarino = new Client({
        protocol: 'http',
        host: '127.0.0.1:8001',
        version: 'apps/v1',
        reqOptions: {},
        namespace: req.params.namespace
    });
    clientarino.deployments = clientarino.createCollection('statefulsets',null,null,{ apiPrefix : 'apis',namespaced: true});
    
    clientarino.deployments.get(name,function (err, data) {
        if(!err){
            fs.writeFile("results/deployments.json", JSON.stringify(data, null, 4));
            res.status(200).json(data)
        }
        else{json   
            console.log("Error")
        }
    });
});

//Changes the number of replicas
router.post('/replicas/:namespace/:deployment/:id',(req,res,next)=>{
    state.id="1"
    state.msg="1-A modificar réplicas"
    const name = req.params.deployment
    const id = req.params.id
    var clientarino = new Client({
        protocol: 'http',
        host: '127.0.0.1:8001',
        version: 'apps/v1',
        reqOptions: {},
        namespace: req.params.namespace
    });
    clientarino.deployments = clientarino.createCollection('statefulsets',null,null,{ apiPrefix : 'apis',namespaced: true});
    
    clientarino.deployments.get(name,function (err, data) {
        if(!err){
            const novo = {spec:{replicas:id}}
            extend(true,data,novo)
            data.spec.replicas=parseInt(id)
            clientarino.deployments.update(name,data,function (err, data) {
                if(!err){
                    console.log("done")
                    res.status(200).json(data)
                }
                else{
                    console.log("ups"+JSON.stringify(err))
                }
            });
        }
        else{
            console.log("Error")
        }
    });
    //executeFeedback()
});

//Changes the limit of cpu
router.post('/resources/:namespace/limits/cpu/:deployment/:id/:index',(req,res,next)=>{
    state.id="1"
    state.msg="1-A modificar limite de cpu"
     const index=req.params.index
    const name = req.params.deployment
    const id = req.params.id
    var clientarino = new Client({
        protocol: 'http',
        host: '127.0.0.1:8001',
        version: 'apps/v1',
        reqOptions: {},
        namespace: req.params.namespace
    });
    clientarino.deployments = clientarino.createCollection('statefulsets',null,null,{ apiPrefix : 'apis',namespaced: true});
    
    clientarino.deployments.get(name,function (err, data) {
        if(!err){
            
            const final=id
            var container=data.spec.template.spec.containers[index]
            extend(true,container,{resources:{limits:{cpu:final}}})
            //extend(true,data,novo)
            clientarino.deployments.update(name,data,function (err, data) {
                if(!err){
                    console.log("done")
                    res.status(200).json(data)
                }
                else{
                    console.log("ups"+JSON.stringify(err))
                }
            });
        }
        else{
            console.log("Error")
        }
    });
    //executeFeedback()
});


//Changes the limit of memory
router.post('/resources/:namespace/limits/memory/:deployment/:id/:index',(req,res,next)=>{
    state.id="1"
    state.msg="1-A modificar limite de memória"
    const index=req.params.index
    const name = req.params.deployment
    const id = req.params.id
    var clientarino = new Client({
        protocol: 'http',
        host: '127.0.0.1:8001',
        version: 'apps/v1',
        reqOptions: {},
        namespace: req.params.namespace
    });
    clientarino.deployments = clientarino.createCollection('statefulsets',null,null,{ apiPrefix : 'apis',namespaced: true});
    
    clientarino.deployments.get(name,function (err, data) {
        if(!err){
                        
            const final=id
            var container=data.spec.template.spec.containers[index]
            extend(true,container,{resources:{limits:{memory:final}}})
           /* const novo={spec:{template:{spec:{containers:[{resources:{limits:{memory:final}}}]}}}}
            extend(true,data,novo)*/
            clientarino.deployments.update(name,data,function (err, data) {
                if(!err){
                    console.log("done")
                    res.status(200).json(data)
                }
                else{
                    console.log("ups"+JSON.stringify(err))
                }
            });
        }
        else{
            console.log("Error")
        }
    });
    //executeFeedback()
});

//Changes the cpu requests
router.post('/resources/:namespace/requests/cpu/:deployment/:id/:index',(req,res,next)=>{
    state.id="1"
    state.msg="1-A modificar request de cpu"
    const index=req.params.index
    const name = req.params.deployment
    const id = req.params.id
    var clientarino = new Client({
        protocol: 'http',
        host: '127.0.0.1:8001',
        version: 'apps/v1',
        reqOptions: {},
        namespace: req.params.namespace
    });
    clientarino.deployments = clientarino.createCollection('statefulsets',null,null,{ apiPrefix : 'apis',namespaced: true});
    
    clientarino.deployments.get(name,function (err, data) {
        if(!err){
            
            const final=id
            var container=data.spec.template.spec.containers[index]
            extend(true,container,{resources:{requests:{cpu:final}}})
            
            //extend(true,data,novo)
            console.log("after whatever"+JSON.stringify(data))
            fs.writeFile("results/erross.json", JSON.stringify(data, null, 4));
            
             
            clientarino.deployments.update(name,data,function (err, data) {
                if(!err){
                    console.log("done")
                    res.status(200).json(data)
                }
                else{
                    console.log("ups"+JSON.stringify(err))
                }
            });
        }
        else{
            console.log("Error")
        }
    });
    //executeFeedback()
});

router.post('/resources/:namespace/requests/memory/:deployment/:id/:index',(req,res,next)=>{
    state.id="1"
    state.msg="1-A modificar request de memória"
    const name = req.params.deployment
    const id = req.params.id
    const index=req.params.index
    var clientarino = new Client({
        protocol: 'http',
        host: '127.0.0.1:8001',
        version: 'apps/v1',
        reqOptions: {},
        namespace: req.params.namespace
    });
    clientarino.deployments = clientarino.createCollection('statefulsets',null,null,{ apiPrefix : 'apis',namespaced: true});
    
    clientarino.deployments.get(name,function (err, data) {
        if(!err){
            const final=id
            var container=data.spec.template.spec.containers[index]
            extend(true,container,{resources:{requests:{memory:final}}})
            
            //extend(true,data,novo)
            fs.writeFile("results/erross.json", JSON.stringify(data, null, 4)); 
            clientarino.deployments.update(name,data,function (err, data) {
                if(!err){
                    console.log("done")
                    res.status(200).json(data)
                }
                else{
                    console.log("ups"+JSON.stringify(err))
                }
            });
        }
        else{
            console.log("Error")
        }
    });
    //executeFeedback()
});

/*function executeFeedback(){
    exec('rm agent.*.pickle', { cwd: './../deployment/' }, (error, stdout, stderr) => {
        if (error) throw error;
    });
    exec('./startagents.sh', { cwd: './../deployment/' }, (error, stdout, stderr) => {
        console.log( stdout, stderr ); 
       
        state.id="2"
        state.msg="2- A começar a monitorização"
        if (error) {
            console.log("oh")
            return;
        }
    });
    setTimeout(execFunction, 60000);
    setTimeout(execLoad, 70000);
}

function execFunction(){
    state.id="3"
    state.msg="3-A parar monitorização"
    exec('./stopagents.sh', { cwd: './../deployment/' }, (error, stdout, stderr) => {
        console.log( stdout, stderr ); 
        if (error) {
            console.log("oh")
            return;
        }
    });
}

function execInBetween(){
    console.log("inBetween")
    exec('./runscan.sh', { cwd: './../deployment/' }, (error, stdout, stderr) => {
        console.log( stdout, stderr ); 
        if (error) {
            console.log("oh")
            return;
        }
    });
}
function execLoad(){
    state.id="4"
    state.msg="4-A lançar dados para neo4j"
    exec('./loadresults.sh --clear agent.*.pickle', { cwd: './../deployment/' }, (error, stdout, stderr) => {
        console.log( stdout, stderr ); 
        if (error) {
            console.log("oh")
            return;
        }
    });
}*/

module.exports = router;