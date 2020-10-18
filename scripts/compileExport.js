const execSync = require('child_process').execSync;
const globals = require('./globals');
const fs = require('fs');
exports.compileCobolProgram = compileCobolProgram;

function execCommand(command) {
    execSync(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`${command} error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`${command} stderr: ${stderr}`);
            return;
        }
        if (stdout) {
            console.log(`${stdout}`);
            return;
        }
    });
}

function compileCobolProgram(programName = '', SUBPROGRAM = false, TEST = false, CLEAN = false) {
    var PATH = globals.PROJECT + ":" + globals.TARGET + ":" + globals.PATH;

    if (fs.existsSync(globals.TARGET) == false)
    fs.mkdirSync(globals.TARGET);

    if (TEST)              
        var SOURCE = globals.TESTSRC
    else
        var SOURCE = globals.MAINSRC           

    if (SUBPROGRAM) {      
        var SUFFIX = '.so'
        var COBOPTS = '-m'
    }
    else {                         
        var SUFFIX = ''
        var COBOPTS = '-x'
    }

    if (CLEAN && fs.existsSync(globals.TARGET+ "/" + programName + SUFFIX))
        fs.unlinkSync(globals.TARGET + "/" + programName + SUFFIX);
    console.log('Compile started')
    var command = "cobc " + COBOPTS + " -std=ibm " + SOURCE + "/" + programName + ".CBL -o "+ globals.TARGET + "/" + programName + SUFFIX
    execCommand(command);
    console.log('Compile ended')
}