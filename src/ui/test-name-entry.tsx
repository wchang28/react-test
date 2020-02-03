import * as React from 'react';
import {NameEntry, Name} from "./name-entry";

interface State {
	name?: Name
}

export class Test extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			name: {
				firstName: "Wen"
				,lastName: "Chang"
			}
		};
	}
	onNameEntryChange(value: Name) {
		this.setState({name: value});
	}
	render() {
		return (
		<div>
			<NameEntry value={this.state.name} onChange={this.onNameEntryChange.bind(this)}/>
		</div>
		);
	}
}
