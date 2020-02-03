import * as React from 'react';
import {Test as TestNameEntry} from "./test-name-entry";
import {Test as TestNameDialog} from "./test-dialog";

export type TestComponentConstructor = new (props?: any) => any;

interface State {
	testSelected?: string;
}

export class App extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			testSelected: ""
		};
	}
	onTestSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
		this.setState({testSelected: event.target.value});
	}
	render() {
		let testComponentClass: TestComponentConstructor = null;
		switch(this.state.testSelected) {
			case "name-entry":
				testComponentClass = TestNameEntry;
				break;
			case "dialog":
				testComponentClass = TestNameDialog;
				break;
		}
		let testElement = (testComponentClass ? React.createElement(testComponentClass): null);
		let testDiv = (testElement ? (<div className="w3-container w3-card-4 w3-border w3-margin-top">{testElement}</div>) : null);
		return (
			<div className="w3-row-padding">
				<div className="w3-third">
					<div>
						<label>Test Selection:</label>
						<select className="w3-select w3-border" value={this.state.testSelected} onChange={this.onTestSelectChange.bind(this)}>
							<option value="" disabled selected>Choose your option</option>
							<option value="name-entry">Name Entry</option>
							<option value="dialog">Dialog</option>
						</select>
					</div>
					{testDiv}
				</div>
			</div>
		);
	}
}
