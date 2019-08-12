// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Environment } from './environmentPath';
// import { state } from './state';
import { GiteeOAuthService } from './service/gitee.oauth.service';
import { SyncService } from './service/sync';
import { ExtensionInformation } from './service/plugin.service';
import * as nls from 'vscode-nls';

const localize = nls.config({ messageFormat: nls.MessageFormat.file })();
// import { extensions } from "vscode";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	// state.context = context;
	let environment = new Environment(context);
	let configuration = vscode.workspace.getConfiguration('gitee');
	var gist = configuration.get('gist');
	var aoth = configuration.get('access_token');
	let giteeService = new GiteeOAuthService(aoth, gist);
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "simple-extension" is now active!');
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let push = vscode.commands.registerCommand('extension.uploadSetting', () => {
		// The code you place here will be executed every time your command is executed
		giteeService.postGist(environment.FILE_SETTING, environment.FILE_SETTING_NAME, vscode.window.showInformationMessage);
		vscode.window.showInformationMessage(environment.FILE_EXTENSION);
		giteeService.postGist(environment.FILE_EXTENSION, environment.FILE_EXTENSION_NAME, vscode.window.showInformationMessage);

	});

	let pull = vscode.commands.registerCommand('extension.downloadSetting', () => {
		// The code you place here will be executed every time your command is executed
		vscode.window.showInformationMessage("environment.FILE_EXTENSION");
		// giteeService.fetchGist(environment.FILE_SETTING, environment.FILE_SETTING_NAME, vscode.window.showInformationMessage);
		// giteeService.fetchGist(environment.FILE_EXTENSION, environment.FILE_EXTENSION_NAME, vscode.window.showInformationMessage);
		// let extsinfo = [ExtensionInformation.fromJSON(JSON.stringify({ name: 'vue-snippets', publisher: 'hollowtree' }))];
		SyncService.isntallExt('test', vscode.window.showInformationMessage);

	});

	context.subscriptions.push(push);
	context.subscriptions.push(pull);
}

// this method is called when your extension is deactivated
export function deactivate() { }
