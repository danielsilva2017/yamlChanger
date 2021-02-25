const express = require('express');
const extend = require('extend')
const router = express.Router();
const exec = require('child_process').exec;

function execute(){
    
    exec('rm agent.*.pickle', { cwd: './../deployment/' }, (error, stdout, stderr) => {
        console.log("deleting agent pickles")
        if (error) throw error;
    });
    setTimeout(() => {
       
    }, 20000);
    exec('./startagents.sh', { cwd: './../deployment/' }, (error, stdout, stderr) => {
        console.log( stdout, stderr ); 
       
        if (error) {
            console.log("oh")
            return;
        }
    });
    

}

function executeFinish(){
    console.log("finishing");
    exec('./stopagents.sh', { cwd: './../deployment/' }, (error, stdout, stderr) => {
        console.log("xddd")
        console.log( stdout, stderr ); 
        if (error) throw error
    });
    setTimeout(execLoad, 40000);
    setTimeout(() => {
        console.log("finished")
    }, 120000);
}


function execLoad(){
    console.log("----STARTING TO LOAD TO NEO4J-------")
    exec('./loadresults.sh --clear --k8s services.txt agent.*.pickle > /dev/null 2>&1', { cwd: './../deployment/',stdio: ['pipe', 'pipe', 'ignore']}, (error, stdout, stderr) => {
        console.log("end"); 
        if (error) throw error
    });
    
}
function delay ( time ) {
    return new Promise( resolve => setTimeout( resolve, time ) )
}

router.post('/start/',async(req,res,next)=>{
    execute()
});
router.post('/stop/',async(req,res,next)=>{
    executeFinish()
});



module.exports = router;