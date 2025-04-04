import * as vscode from 'vscode';

class MCBasicSemanticProvider implements vscode.DocumentSemanticTokensProvider {
    provideDocumentSemanticTokens(
        document: vscode.TextDocument
    ): vscode.ProviderResult<vscode.SemanticTokens> {
        const builder = new vscode.SemanticTokensBuilder();

        const text = document.getText();
        
        const invalidVariableRegex = /\b\d[a-zA-Z0-9_]*\b/g; // Match invalid variable names
        const invalidFunctionRegex = /\b\d[a-zA-Z0-9_]*\b(?=\()/g; // Match invalid function names
        const variableRegex = /\blet\s+([a-zA-Z_][a-zA-Z0-9_]*)/g;
        const typeRegex = /\b(int|double|str)\b/g;
        const keywordRegex = /\b(func|if|else|return|and|or|not|xor)\b/g;

        let match: RegExpExecArray | null;

        // Highlight invalid variable names
        while ((match = invalidVariableRegex.exec(text))) {
            const start = document.positionAt(match.index);
            builder.push(
                start.line,
                start.character,
                match[0].length,
                0, // invalid
                0  // no modifier
            );
        }

        // Highlight invalid function names
        while ((match = invalidFunctionRegex.exec(text))) {
            const start = document.positionAt(match.index);
            builder.push(
                start.line,
                start.character,
                match[0].length,
                0, // invalid
                0  // no modifier
            );
        }

        // Highlight variable names (normal)
        while ((match = variableRegex.exec(text))) {
            const start = document.positionAt(match.index + 4); // skip "let "
            builder.push(
                start.line,
                start.character,
                match[1].length,
                0, // variable
                0  // declaration
            );
        }

        // Highlight types
        while ((match = typeRegex.exec(text))) {
            const start = document.positionAt(match.index);
            builder.push(
                start.line,
                start.character,
                match[1].length,
                1, // type
                0
            );
        }

        // Highlight keywords
        while ((match = keywordRegex.exec(text))) {
            const start = document.positionAt(match.index);
            builder.push(
                start.line,
                start.character,
                match[1].length,
                2, // keyword
                0
            );
        }

        return builder.build();
    }
}

export {
    MCBasicSemanticProvider
};