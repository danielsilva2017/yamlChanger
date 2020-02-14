const express = require('express');
const app = express();


const deploymentRoutes= require('./api/routes/deployment')
const podsRoutes = require('./api/routes/pods')
app.use('/deployments',deploymentRoutes);
app.use('/pods',podsRoutes)

module.exports = app;