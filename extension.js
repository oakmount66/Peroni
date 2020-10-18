// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const { compileCobolProgram } = require('./scripts/compileExport');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Peroni" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('Peroni.showUnitTests', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World :-) from Peroni!');
		//let unitTests = ['BADEXAMT', 'CICSDEMT', 'FILEDEMT', 'fizzbuzz-unit-tests-sample', 'PARADEMT',
		//		         'CALLDEMT', 'CONVERTT', 'FIZZBUZT', 'INVDATET', 'SAMPLET',
		//				 'CARD1T', 'EMPTY', 'fizzbuzz-unit-tests', 'MOCKDEMT', 'SUBPROGT'];
		let folder = '/home/oakmount/Dropbox/COBOL/cobol-unit-test/src/test/cobol/unit-tests/'
		let unitTests = fs.readdirSync(folder);
		//vscode.window.showInformationMessage('unitTests[0] ' + unitTests[0]);
		//vscode.window.showInformationMessage('unitTests[1] ' + unitTests[1]);
		//vscode.window.showInformationMessage('unitTests[5] ' + unitTests[5]);
		unitTests.forEach(element => {
			//vscode.window.showInformationMessage('element ' + element);
			let doc = vscode.workspace.openTextDocument(folder + element)
			vscode.window.showTextDocument(doc)				
		});

	});

	let disposable2 = vscode.commands.registerCommand('Peroni.runUnitTests', function() {
		vscode.window.showInformationMessage('Hello World :-) from runUnitTests!');
	});

	let disposable3 = vscode.commands.registerCommand('Peroni.compileCOBOL', function() {
		compileCobolProgram(${file}, false, false, false)
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
