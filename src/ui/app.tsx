import * as React from 'react';
import {NameEntry} from "./name-entry";

interface State {
	name?: {
        firstName?: string;
        lastName?: string;		
	}
}

export class App extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			name: {
				firstName: "Wen"
				,lastName: "Chang"
			}
		};
	}
	onNameEntryChange(value: {firstName?: string, lastName?: string}) {
		this.setState({name: value});
	}
	render() {
		return (
		<div>
			Hello Sir
			<NameEntry value={this.state.name} onChange={this.onNameEntryChange.bind(this)}/>
		</div>
		);
	}
}