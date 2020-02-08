var Client = require('node-kubernetes-client');
var fs = require('fs');
var client = new Client({
    protocol: 'http',
host: '127.0.0.1:8001',
version: 'v1',
reqOptions: {},
namespace: 'default'
});
/*client.pods.get(function (err, pods) {
    console.log('pods:', JSON.stringify(pods));
    a=JSON.stringify(pods);
    fs.writeFile("results/pods.json", JSON.stringify(pods, null, 4));
});

client.endpoints.get(function (err, endpoints) {
    if (!err) {
      console.log('endpoints: ' + JSON.stringify(endpoints));
      b=JSON.stringify(endpoints)
      fs.writeFile("results/endpoints.json", JSON.stringify(endpoints, null, 4));
    }
});

client.services.get(function (err, data){
    console.log('endpoints: ' + JSON.stringify(data));
    fs.writeFile("results/services.json", JSON.stringify(data, null, 4));
});
client.deployments = client.createCollection('Deployments');

client.services.get( function (err, data) {
    console.log("here"+JSON.stringify(data))
    
});*/

var client2 = new Client({
    protocol: 'http',
host: '127.0.0.1:8001',
version: 'apps/v1',
reqOptions: {},
namespace: 'default'
});

client2.deployments = client2.createCollection('deployments',null,null,{ apiPrefix : 'apis' });

client2.deployments.get( function (err, data) {
    console.log("here"+JSON.stringify(data))
    fs.writeFile("results/deployments.json", JSON.stringify(data, null, 4));
    
});