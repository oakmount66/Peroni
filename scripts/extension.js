const vscode = require('vscode');
const fs = require('fs');
const { compileCobolProgram } = require('./compileExport');

function activate(context) {

	console.log('Congratulations, your extension "Peroni" is now active!');

	let disposable = vscode.commands.registerCommand('peroni.showUnitTests', function () {
		let folder = '/home/oakmount/Dropbox/COBOL/cobol-unit-test/src/test/cobol/unit-tests/'
		let unitTests = fs.readdirSync(folder);
		unitTests.forEach(element => {
			let doc = vscode.workspace.openTextDocument(folder + element)
			vscode.window.showTextDocument(doc)				
		});

	});

	let disposable2 = vscode.commands.registerCommand('peroni.compileCOBOL', function() {
		let fileName = vscode.window.activeTextEditor.document.fileName
		vscode.window.showInformationMessage('Hello World from compileCOBOL - ' + fileName);
		vscode.window.showInformationMessage('Ciao Lars :-) - prima compileCobolProgram');
		compileCobolProgram(fileName, false, false, false)
		vscode.window.showInformationMessage('Ciao Lars :-) - dopo compileCobolProgram');
	});

	let disposable3 = vscode.commands.registerCommand('peroni.runUnitTests', function() {
		let fileName = vscode.window.activeTextEditor.document.fileName
		vscode.window.showInformationMessage('Hello World :-) from runUnitTests - ' + fileName);
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
}
//exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
