const vscode = require('vscode');
const execSync = require('child_process').execSync;
const globals = require('./globals.json');
const fs = require('fs');
const { exec } = require('child_process');
const { spawn } = require('child_process');
const { stdout } = require('process');
exports.compileCobolProgram = compileCobolProgram;

function execCommand(command) {
    execSync(command);
}

function compileCobolProgram(programName = '', subprogram = false, test = false, clean = false) {
    var path = globals.project + ":" + globals.target + ":" + globals.path;

    if ( programName != '') {
        var programNameSpliced = programName.split('/')
        programName = programNameSpliced[programNameSpliced.length-1];
        if (programName.slice(-4).toUpperCase() == '.CBL') {
            var targetProgramName = programName.slice(0,-4)
        }
    }

    if (fs.existsSync(globals.target) == false)
    fs.mkdirSync(globals.target);

    if (test)              
        var source = globals.testsrc
    else
        var source = globals.mainsrc           

    if (subprogram) {      
        var suffix = '.so'
        var cobopts = '-m'
    }
    else {                         
        var suffix = ''
        var cobopts = '-x'
    }

    if (clean && fs.existsSync(globals.target+ "/" + programName + suffix))
        fs.unlinkSync(globals.target + "/" + programName + suffix);
        
    var command = "cobc " + cobopts + " -std=ibm -I " + globals.maincpy  + " -o " + globals.target + "/" + 
                  targetProgramName + suffix + " -t compile.lst " + programName
    vscode.window.showInformationMessage('command: ' + command);
    
    var child = spawn(command, {
        stdio: 'inherit',
        shell: true,
        cwd: './'
    });
}