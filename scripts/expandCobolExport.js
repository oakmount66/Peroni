const vscode = require('vscode');
const execSync = require('child_process').execSync;
const { spawn } = require('child_process');
const globals= require('./globals.json');
const { stdout } = require('process');
exports.expandCobolProgram = expandCobolProgram;

function execCommand(command) {
    execSync(command);
}

function expandCobolProgram(programName = '') {
    vscode.window.showInformationMessage('Ciao a compileCobolProgram #1');

    if ( programName != '') {
        var programNameSpliced = programName.split('/')
        vscode.window.showInformationMessage("programNameSpliced:" + programNameSpliced)
        var shortProgramName = programNameSpliced[programNameSpliced.length-1];
        if (shortProgramName.slice(-4).toUpperCase() == '.CBL') {
            shortProgramName = shortProgramName.slice(0,-4)
        }
    }

    vscode.window.showInformationMessage('programName : ' + programName);

    //var command = "cobc -E -std=ibm -o ./" + programName + ".exp " + programName
    var command = "cobc -std=ibm -E -I " + globals.maincpy + " -o " + programName + ".EXP " + programName
    vscode.window.showInformationMessage("command: " + command)
    
    /*const result = execSync(command,{stdio: 'inherit'});
    vscode.window.showInformationMessage("result: " + result)*/
    
    var child = spawn(command, {
        stdio: 'inherit',
        shell: true,
        cwd: './'
      });

    vscode.window.showInformationMessage("stdout: " + child.stdout)
}