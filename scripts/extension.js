const vscode = require('vscode');
const fs = require('fs');
const { compileCobolProgram } = require('./compileExport');
const { expandCobolProgram } = require('./expandCobolExport');


function activate(context) {

	console.log('Congratulations, your extension "Peroni" is now active!');

	let disposable = vscode.commands.registerCommand('peroni.showUnitTests', async function () {
		let folder = '/home/oakmount/Dropbox/COBOL/cobol-unit-test/src/test/cobol/unit-tests/'
		let unitTests = fs.readdirSync(folder);
		unitTests.forEach(async element => {
			let doc = vscode.workspace.openTextDocument(folder + element)
			await vscode.window.showTextDocument(doc)				
		});

	});

	let disposable2 = vscode.commands.registerCommand('peroni.compileCOBOL', function() {
		let fileName = vscode.window.activeTextEditor.document.fileName
		compileCobolProgram(fileName, false, false, false)
	});

	let disposable3 = vscode.commands.registerCommand('peroni.runUnitTests', function() {
		let fileName = vscode.window.activeTextEditor.document.fileName
		vscode.window.showInformationMessage('Hello World :-) from runUnitTests - ' + fileName);
	});

	let disposable4 = vscode.commands.registerCommand('peroni.expandCobol', async function() {
		let fileName = vscode.window.activeTextEditor.document.fileName
		await expandCobolProgram(fileName)
		var expFileName = fileName + ".EXP"
		let doc = vscode.workspace.openTextDocument(expFileName)
		await vscode.window.showTextDocument(doc)				
});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
	context.subscriptions.push(disposable4);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
