const express = require('express');
const app = express();
const cors = require('cors')

const deploymentRoutes= require('./api/routes/deployment')
const podsRoutes = require('./api/routes/pods')
const statefulRoutes= require('./api/routes/stateful')
const replicaSets= require('./api/routes/replicaset')
app.use(cors())
app.use('/deployment',deploymentRoutes);
app.use('/pods',podsRoutes)
app.use('/statefulset',statefulRoutes);
app.use('/replicaset',replicaSets)

module.exports = app;