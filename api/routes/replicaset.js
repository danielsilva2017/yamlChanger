const express = require('express');
const extend = require('extend')
const router = express.Router();
const kub = require('../../client')
var Client = require('node-kubernetes-client');
var fs = require('fs');

var client = new Client({
    protocol: 'http',
    host: '127.0.0.1:8001',
    version: 'apps/v1',
    reqOptions: {}
});

client.deployments = client.createCollection('replicasets',null,null,{ apiPrefix : 'apis',namespaced: true});


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

router.get('/xd/:test',(req,res,next)=>{
    console.log("wow")
    res.status(200).json("estamos aqui")
   
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
    clientarino.deployments = clientarino.createCollection('replicasets',null,null,{ apiPrefix : 'apis',namespaced: true});
   
    clientarino.deployments.get(name,function (err, data) {
        if(!err){
            fs.writeFile("results/deployments.json", JSON.stringify(data, null, 4));
            res.status(200).json(data)
        }
        else{
            console.log("Error"+JSON.stringify(err))
        }
    });
});

//Changes the number of replicas
router.post('/replicas/:namespace/:deployment/:id',(req,res,next)=>{
    const name = req.params.deployment
    const id = req.params.id
    var clientarino = new Client({
        protocol: 'http',
        host: '127.0.0.1:8001',
        version: 'apps/v1',
        reqOptions: {},
        namespace: req.params.namespace
    });
    clientarino.deployments = clientarino.createCollection('replicasets',null,null,{ apiPrefix : 'apis',namespaced: true});
   
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
                    console.log("here m8"+JSON.stringify(err))
                }
            });
        }
        else{
            console.log("Error"+JSON.stringify(err))
        }
    });
});

//Changes the limit of cpu
router.post('/resources/limits/cpu/:deployment/:id',(req,res,next)=>{
    const name = req.params.deployment
    const id = req.params.id
    client.deployments.get(name,function (err, data) {
        if(!err){
            const final=id
            const novo={spec:{template:{spec:{containers:[{resources:{limits:{cpu:final}}}]}}}}
            extend(true,data,novo)
            client.deployments.update(name,data,function (err, data) {
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
            console.log("Error"+JSON.stringify(err))
        }
    });
});


//Changes the limit of memory
router.post('/resources/limits/memory/:deployment/:id',(req,res,next)=>{
    const name = req.params.deployment
    const id = req.params.id
    client.deployments.get(name,function (err, data) {
        if(!err){
            console.log("here")
            const final = id
            const novo={spec:{template:{spec:{containers:[{resources:{limits:{memory:final}}}]}}}}
            extend(true,data,novo)
            client.deployments.update(name,data,function (err, data) {
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
});

//Changes the cpu requests
router.post('/resources/requests/cpu/:deployment/:id',(req,res,next)=>{
    const name = req.params.deployment
    const id = req.params.id
    client.deployments.get(name,function (err, data) {
        if(!err){
            console.log("here")
            const final=id
            const novo={spec:{template:{spec:{containers:[{resources:{requests:{cpu:final}}}]}}}}
            extend(true,data,novo)
            fs.writeFile("results/erross.json", JSON.stringify(data, null, 4));
            
             
            client.deployments.update(name,data,function (err, data) {
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
});

router.post('/resources/requests/memory/:deployment/:id',(req,res,next)=>{
    const name = req.params.deployment
    const id = req.params.id
    client.deployments.get(name,function (err, data) {
        if(!err){
            const final=id
            const novo={spec:{template:{spec:{containers:[{resources:{requests:{memory:final}}}]}}}}
            extend(true,data,novo)
            fs.writeFile("results/erross.json", JSON.stringify(data, null, 4)); 
            client.deployments.update(name,data,function (err, data) {
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
});



module.exports = router;