const express = require('express');
const extend = require('extend')
const router = express.Router();
const kub = require('../../client')
const exec = require('child_process').exec;
const fs = require('fs')


router.post('/',(req,res,next)=>{
    console.log(req.body)
    fs.readFile('../app-monitor/public/load.json', "UTF8", (err, data) => {
        if (err) throw err;
        let str= JSON.parse(data);
        str[req.body.keyword]=req.body.url
        fs.writeFile('../app-monitor/public/load.json', JSON.stringify(str,null,4), (err) => {
            if (err) throw err;
            else res.status(200).json("finished")
          });

})});

module.exports = router;