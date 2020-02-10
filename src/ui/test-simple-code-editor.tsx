import * as React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import "codemirror/mode/sql/sql";

interface State {
	code?: string
}

export class Test extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			code: "select * from  user;"
		};
	}
	onValueChange(editor, data, value: string) {
		this.setState({code: value});
	}
	render() {
		return (
		<div>
			<CodeMirror
				value={this.state.code}
				onBeforeChange={this.onValueChange.bind(this)}
				onChange={() => {}}
				options={{
					mode: "sql"
					,theme: 'material'
					,lineNumbers: true
				}}
			/>
		</div>
		);
	}
}
