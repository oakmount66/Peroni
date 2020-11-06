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

    vscode.window.showInformationMessage('Ciao a compileCobolProgram #1');

    if ( programName != '') {
        var programNameSpliced = programName.split('/')
        programName = programNameSpliced[-1];
        if (programName[-4].toUpperCase() == '.CBL') {
            programName = programName.slice(0,-4)
        }
    }

    vscode.window.showInformationMessage('programName : ' + programName);

    if (fs.existsSync(globals.target) == false)
    fs.mkdirSync(globals.target);

    vscode.window.showInformationMessage('Ciao a compileCobolProgram #2');
    if (test)              
        var source = globals.testsrc
    else
        var source = globals.mainsrc           

    vscode.window.showInformationMessage('Ciao a compileCobolProgram #3');
    if (subprogram) {      
        var suffix = '.so'
        var cobopts = '-m'
    }
    else {                         
        var suffix = ''
        var cobopts = '-x'
    }

    vscode.window.showInformationMessage('Ciao a compileCobolProgram #4');
    if (clean && fs.existsSync(globals.target+ "/" + programName + suffix))
        fs.unlinkSync(globals.target + "/" + programName + suffix);
        
    vscode.window.showInformationMessage('Ciao a compileCobolProgram #5');
    var command = "cobc " + cobopts + " -std=ibm " + programName + " -o "+ globals.target + "/" + programName + suffix
    vscode.window.showInformationMessage('Ciao a compileCobolProgram #6');
    vscode.window.showInformationMessage('command: ' + command);
    
    //const result = execSync(command,{stdio: 'inherit'});
    const child = spawn(command, {
        stdio: 'inherit',
        shell: true,
        cwd: './'
      });

    vscode.window.showInformationMessage('Ciao a compileCobolProgram #7');
}