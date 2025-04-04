"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const semanticProvider_1 = require("./semanticProvider");
function activate(context) {
    const legend = new vscode.SemanticTokensLegend(["variable", "type", "keyword"], ["declaration"]);
    context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider({ language: "mcbasic" }, new semanticProvider_1.MCBasicSemanticProvider(), legend));
}
function deactivate() { }
//# sourceMappingURL=extension.js.map