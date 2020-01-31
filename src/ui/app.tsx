import * as React from 'react';
import {NameEntry, Name} from "./name-entry";
import {Dialog, FieldErrors} from "./setup-dialog";

/*
interface State {
	name?: Name
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
	onNameEntryChange(value: Name) {
		this.setState({name: value});
	}
	render() {
		return (
		<div className="w3-container w3-card-4 w3-border">
			<NameEntry value={this.state.name} onChange={this.onNameEntryChange.bind(this)}/>
		</div>
		);
	}
}
*/

interface State {
	name?: Name
	,dialogVisible?: boolean;
}

export class App extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			name: {
				firstName: "Wen"
				,lastName: "Chang"
			}
			,dialogVisible: false
		};
	}
	onDialogClose(data: Name, hint?: any) {
		this.setState({dialogVisible: false});
		if (data) {
			this.setState({name: data});
		}
	}
	onEditClick() {
		this.setState({dialogVisible: true});
	}
	render() {
		const verifyData = async (data: Name) => {
			const ret: FieldErrors = {};
			if (!data || !data.firstName) {
				ret["first-name"] = "Frist name cannot be blank"
			}
			if (!data || !data.lastName) {
				ret["last-name"] = "Last name cannot be blank"
			}
			return ret;
		};
		const dialog = (this.state.dialogVisible ? (
			<Dialog
			contentComponentConstructor={NameEntry}
			data={this.state.name}
			verifyData={verifyData}
			captions="Edit Your Name" 
			hint={null}
			onClose = {this.onDialogClose.bind(this)}
			/>
		) : null);
		return (
		<div className="w3-container w3-card-4 w3-border">
			<label>Hi {this.state.name.firstName} {this.state.name.lastName}!</label>
			<p>
				<button className="w3-button w3-border w3-round" onClick={() => this.onEditClick()}>Edit name</button>
			</p>
			{dialog}
		</div>
		);
	}
}
