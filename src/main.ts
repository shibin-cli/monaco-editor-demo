import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { language as sqlLanguage } from 'monaco-editor/esm/vs/basic-languages/sql/sql'

import './userWorker'
type Language = 'javascript' | 'sql'

monaco.languages.registerCompletionItemProvider('sql', {
	provideCompletionItems(model, position) {
		const textUntilPosition = model.getValueInRange({
			startColumn: position.lineNumber,
			startLineNumber: 1,
			endLineNumber: position.lineNumber,
			endColumn: position.column
		})
		const match = textUntilPosition.match(/(\S+)$/)
		const suggestions = []
		const keys = ['keywords', 'builtinFunctions', 'operators']
		if (!match) {
			return {
				suggestions
			}
		}
		keys.map(v => {
			console.log(sqlLanguage)
			sqlLanguage[v].forEach(item => {
				if (item.indexOf(match[0].toUpperCase()) !== -1) {
					suggestions.push({
						label: item.toUpperCase(),
						kind: monaco.languages.CompletionItemKind.Keyword,
						insertText: item.toUpperCase()
					})
				}
			})
		})
		return {
			suggestions
		}
	}
})
function createEditor(el: HTMLElement, { value = '', language = 'javascript' }: { value?: string, language: Language }):void {
	monaco.editor.create(el, {
		value: value,
		language,
		theme: 'vs-dark',
		lineNumbers: 'off',
		roundedSelection: false,
		scrollBeyondLastLine: false,
		readOnly: false,
	});
}
createEditor(document.getElementById('container'), {
	value: `function hello() {\n\talert('Hello world!');\n}`,
	language: 'javascript'
})
createEditor(document.getElementById('sql-container'), {
	language: 'sql'
})