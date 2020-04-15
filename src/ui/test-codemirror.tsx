import * as React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import "codemirror/mode/sql/sql";
import {Editor, Position} from "codemirror";

const DEFAULT_CODE = "select * from user;\nselect * from organization;"

interface State {
	code?: string;
	cursor?: Position;
	selectFrom?: Position;
	selectTo?: Position;
	lineCount?: number;
	selectionLength?: number;
}

export class Test extends React.Component<any, State> {
	constructor(props) {
		super(props);
		const code = DEFAULT_CODE;
		this.state = {
			code
			,cursor: {ch: 0, line: 0}
			,selectFrom: {ch: 0, line: 0}
			,selectTo: {ch: 0, line: 0}
			,lineCount: null
			,selectionLength: null
		};
	}
	getLinesCumChars(code: string) {
		if (!code) {
			return [];
		} else {
			let cum = 0;
			const lines = this.state.code.split("\n");
			let cums: number[] = [];
			for (let i = 0; i < lines.length; i++) {
				cums.push(cum);
				cum += lines[i].length;
			}
			return cums;
		}
	}
	getOffSet(lineCumChars: number[], pos: Position) {
		return lineCumChars[pos.line] + pos.line + pos.ch;
	}
	get OnResetCodeClickHandler() {
		return (() => {
			this.setState({code: DEFAULT_CODE});
		}).bind(this);
	}
	get OnIsertCodeClickHandler() {
		return (() => {
			const insertedCode = "|xxxyyyzzz|";
			let code = null;
			if (this.state.code) {
				const lineCumChars = this.getLinesCumChars(this.state.code);
				const offsetFrom = this.getOffSet(lineCumChars, this.state.selectFrom);
				const offsetTo = this.getOffSet(lineCumChars, this.state.selectTo);
				//console.log(`\noffsetFrom=${offsetFrom}, offsetTo=${offsetTo}`);
				const beforeStr = this.state.code.substr(0, offsetFrom);
				const afterStr = this.state.code.substr(offsetTo);
				//console.log(`\nbeforeStr=${beforeStr}`);
				//console.log(`\nafterStr=${afterStr}`);
				code = beforeStr + insertedCode + afterStr;
			} else {
				code = insertedCode;
			}
			this.setState({code});
		}).bind(this);
	}
	get OnBeforeChangeHandler() {
		return ((editor: Editor, data, value: string) => {
			//console.log("onBeforeChange()");
			this.setState({code: value});
		}).bind(this);
	}
	get OnChangeHandler() {
		return ((editor: Editor, data, value: string) => {
			//console.log("onChange()");
			this.setState({lineCount: editor.lineCount()});
		}).bind(this);
	}
	getSelectionLines(selectLength: number, selectFrom: Position, selectTo: Position) {
		if (selectLength === 0) {
			return 0;
		} else {
			const lineMin = Math.min(selectFrom.line, selectTo.line);
			const lineMax = Math.max(selectFrom.line, selectTo.line);
			return lineMax - lineMin + 1;
		}		
	}
	get OnCursorActvityHandler() {
		return ((editor: Editor) => {
			/*
			const selectFrom = editor.getCursor("from");
			const selectTo = editor.getCursor("to");
			const selectLength = editor.getSelection().length;
			console.log(`onCursorActivity(\nselectLength=${selectLength}\nselectFrom=${JSON.stringify(selectFrom)}\nselectTo=${JSON.stringify(selectTo)}\n)`);
			*/
			const selectFrom = editor.getCursor("from");
			const selectTo = editor.getCursor("to");
			const {line, ch} = editor.getCursor();
			const selectionLength = editor.getSelection().length;
			this.setState({cursor:{line, ch}, selectionLength, selectFrom, selectTo});
		}).bind(this);
	}
	get OnEditorDidMountHandler() {
		return ((editor: Editor, value: string, cb: () => void) => {
			//console.log("editorDidMount()");
			const lineCount = editor.lineCount();
			const selectionLength = editor.getSelection().length;
			this.setState({lineCount, selectionLength});
			cb();
		}).bind(this);
	}
	render() {
		const selectionLines = this.getSelectionLines(this.state.selectionLength, this.state.selectFrom, this.state.selectTo);
		return (
		<div>
			<div className="w3-bar w3-small">
				<div className="w3-bar-item" style={{padding: "4px"}}>
					<button className="w3-button w3-border" style={{padding: "2px 4px"}} onClick={this.OnResetCodeClickHandler}>Reset Code</button>
					<button className="w3-button w3-border" style={{padding: "2px 4px", marginLeft: "4px"}} onClick={this.OnIsertCodeClickHandler}>Insert Code</button>
				</div>
			</div>
			<div className="w3-tiny">
				<CodeMirror
					value={this.state.code}
					cursor={this.state.cursor}
					onBeforeChange={this.OnBeforeChangeHandler}
					onChange={this.OnChangeHandler}
					onCursorActivity={this.OnCursorActvityHandler}
					editorDidMount={this.OnEditorDidMountHandler}
					options={{
						mode: "sql"
						,theme: 'material'
						,lineNumbers: true
					}}
				/>
			</div>
			<div className="w3-bar w3-border w3-tiny" style={{marginBottom: "4px"}}>
				<div className="w3-bar-item" style={{padding: "2px"}}>length: {this.state.code.length}  lines: {this.state.lineCount}</div>
				<div className="w3-bar-item w3-right" style={{padding: "2px"}}>Ln: {this.state.cursor.line + 1}  Col: {this.state.cursor.ch + 1}  Sel: {`${this.state.selectionLength} | ${selectionLines}`}</div>
			</div>
		</div>
		);
	}
}
