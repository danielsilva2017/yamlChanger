const express = require('express');
const router = express.Router();
const kub = require('../../client')

router.get('/',async (req,res,next)=>{
    kub.getDeployment().then(function(data){
        console.log(data)
        res.status(200).json({
            message : data
        });
    })

    
})


router.get('/:deploymentName',(req,res,next)=>{
    const id = req.params.deploymentName
    res.status(200).json({
        message:'testing'+id
    });
})

module.exports = router;