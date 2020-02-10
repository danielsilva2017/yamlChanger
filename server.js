const http= require('http');    
const app = require('./test')
const port= process.env.Port || 3001;
const server=http.createServer(app);

server.listen(port);