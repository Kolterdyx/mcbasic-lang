import * as vscode from 'vscode';
import { MCBasicSemanticProvider } from './semanticProvider';

export function activate(context: vscode.ExtensionContext) {
    const legend = new vscode.SemanticTokensLegend(
        ["variable", "type", "keyword"],
        ["declaration"]
    );

    context.subscriptions.push(
        vscode.languages.registerDocumentSemanticTokensProvider(
            { language: "mcbasic" },
            new MCBasicSemanticProvider(),
            legend
        )
    );
}

export function deactivate() {}