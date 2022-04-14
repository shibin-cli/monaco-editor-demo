import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import './userWorker'
monaco.editor.create(document.getElementById('container') as HTMLElement, {
	value: "function hello() {\n\talert('Hello world!');\n}",
	language: 'typescript',
    theme: 'vs-dark',
    lineNumbers: 'off',
	roundedSelection: false,
	scrollBeyondLastLine: false,
	readOnly: false,
});
