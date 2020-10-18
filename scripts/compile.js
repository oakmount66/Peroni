const execSync = require('child_process').execSync;
const globals = require('./globals');
const fs = require('fs');

var PATH = globals.PROJECT + ":" + globals.TARGET + ":" + globals.PATH;
var CLEAN = false;
var TEST = false;
var SUBPROGRAM = false;
var programName = '';

console.log("TARGET " + globals.TARGET);

function showHelp() {
	console.log( 'GNU COBOL compile script' );
	console.log( '' );
	console.log( 'Usage: compile [options] program-name-without-suffix [subprogram-names]' );
    console.log( '    -c | --clean  Delete the existing executable before compiling' );
	console.log( '    -h | --help   Display usage help (this text) and process.exit' );
	console.log( '    -t | --test   Source is in the project test directory (not main)' );
    console.log( '    -s | --subprogram Generate a callable subprogram (not an executable)' );
    process.exit();
}

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

process.argv.forEach((val, index) => {
    switch (val) {
        case '-c' || '--clean':
            CLEAN = true;
            break;
        case '-h' || '--help':
            showHelp();
            break;
        case '-t' || '--test':
            var TEST = true;
            break;
        case '-s' || '--subprogram':
            SUBPROGRAM = true;
            break;
        default:
            programName = process.argv[index];
            break;
    }
});
            
if (process.argv.length == 2 )
    showHelp();

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
console.log('Compile')
var command = "cobc " + COBOPTS + " -std=ibm " + SOURCE + "/" + programName + ".CBL -o "+ globals.TARGET + "/" + programName + SUFFIX
execCommand(command);