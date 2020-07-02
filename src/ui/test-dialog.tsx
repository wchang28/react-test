import * as React from 'react';
import {NameEntry, Name} from "./name-entry";
import {Dialog, FieldErrors} from "./setup-dialog";

interface State {
	name?: Name
	,dialogVisible?: boolean;
}

export class Test extends React.Component<any, State> {
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
				ret["firstName"] = "Frist name cannot be blank"
			}
			if (!data || !data.lastName) {
				ret["lastName"] = "Last name cannot be blank"
			}
			return ret;
		};
		const dialog = (this.state.dialogVisible ? (
			<Dialog
			contentComponentClass={NameEntry}
			data={this.state.name}
			verifyData={verifyData}
			captions="Edit Your Name"
			titleBarColor="black"
			hint={null}
			onClose={this.onDialogClose.bind(this)}
			contentProps={{textColor: "green"}}
			maxWidthPx={400}
			/>
		) : null);
		return (
		<div>
			<label>Hi {this.state.name.firstName} {this.state.name.lastName}!</label>
			<p>
				<button className="w3-button w3-border w3-round" onClick={() => this.onEditClick()}>Edit name</button>
			</p>
			{dialog}
		</div>
		);
	}
}