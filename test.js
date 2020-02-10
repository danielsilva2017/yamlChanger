const express = require('express');
const app = express();


const deploymentRoutes= require('./api/routes/deployment')
app.use('/deployments',deploymentRoutes);

module.exports = app;