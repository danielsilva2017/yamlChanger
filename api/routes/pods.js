const express = require('express');
const router = express.Router();
const kub = require('../../client')
var Client = require('node-kubernetes-client');
var fs = require('fs');

var client = new Client({
    protocol: 'http',
host: '127.0.0.1:8001',
version: 'v1',
reqOptions: {}
});
/*client.pods.get(function (err, pods) {
    console.log('pods:', JSON.stringify(pods));
    a=JSON.stringify(pods);
    fs.writeFile("results/pods.json", JSON.stringify(pods, null, 4));
});
*/


router.get('/',(req,res,next)=>{
    client.pods.get( function (err, data) {
        if(!err){
            res.status(200).json(data)
        }
        else{
            console.log("Error"+JSON.stringify(err))
        }
    });
});

router.get('/:pods',(req,res,next)=>{
    const name = req.params.pods
    client.pods.get(name,function (err, data) {
        if(!err){
            res.status(200).json(data)
        }
        else{
            console.log("Error"+JSON.stringify(err))
        }
    });
});


module.exports = router;