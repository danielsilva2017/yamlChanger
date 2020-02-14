var Client = require('node-kubernetes-client');
var fs = require('fs');
var client = new Client({
    protocol: 'http',
host: '127.0.0.1:8001',
version: 'v1',
reqOptions: {},
namespace: 'default'
});/*
client.pods.get(function (err, pods) {
    console.log('pods:', JSON.stringify(pods));
    a=JSON.stringify(pods);
    fs.writeFile("results/pods.json", JSON.stringify(pods, null, 4));
});

*/
/*
client.endpoints.get("tomcat-deployment-b4788ff84-v85jr",function (err, endpoints) {
    if (!err) {
        console.log("supp")
      b=JSON.stringify(endpoints)
      fs.writeFile("results/endpoints.json", JSON.stringify(endpoints, null, 4));
    }
    else{
        console.log(err)
    }
});
/*
client.services.get(function (err, data){
    console.log('endpoints: ' + JSON.stringify(data));
    fs.writeFile("results/services.json", JSON.stringify(data, null, 4));
});
client.deployments = client.createCollection('Deployments');

client.services.get( function (err, data) {
    console.log("here"+JSON.stringify(data))
    
});*/
/*
var client2 = new Client({
    protocol: 'http',
host: '127.0.0.1:8001',
version: 'apps/v1',
reqOptions: {},
namespace: 'default'
});

client2.deployments = client2.createCollection('deployments',null,null,{ apiPrefix : 'apis',namespaced: true});

/*client2.deployments.get( function (err, data) {
    console.log("here"+JSON.stringify(data))
    var a = data[0].items.filter(a=>a.metadata.name=="tomcat-deployment")
    var dataJson=a[0]
    dataJson.spec.replicas=3;
    console.log(dataJson)
    client2.deployments.update('tomcat-deployment',dataJson,function (err, data) {
        if(!err){
            console.log("done")
        }
        else{
            console.log("ups"+JSON.stringify(err))
        }
    });
});*/



module.exports={
    getDeployment : async function getDeployment(){
       await client2.deployments.get( function (err, data) {
            if(!err){
                var a = JSON.stringify(data)
                
            }
            else{
                console.log("Error")
            }
        return "testing"
        });
    },
    xd : function xd(){
        return "xd"
    }
}
