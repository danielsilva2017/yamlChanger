const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser=require('body-parser')

const deploymentRoutes= require('./api/routes/deployment')
const podsRoutes = require('./api/routes/pods')
const statefulRoutes= require('./api/routes/stateful')
const replicaSets= require('./api/routes/replicaset')
const monitor= require('./api/routes/monitor')
const image= require('./api/routes/image')
app.use(cors())
app.use(bodyParser.json())
app.use('/deployment',deploymentRoutes);
app.use('/pods',podsRoutes)
app.use('/monitor',monitor)
app.use('/statefulset',statefulRoutes);
app.use('/replicaset',replicaSets)
app.use('/image',image)



module.exports = app;