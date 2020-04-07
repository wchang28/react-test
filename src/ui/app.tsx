import * as React from 'react';
import {Test as TestNameEntry} from "./test-name-entry";
import {Test as TestDialog} from "./test-dialog";
import {Test as TestCodeMirrorEditor} from "./test-codemirror";
import {Test as TestDatePicker} from "./test-date-picker";
import {Test as TestPagination} from "./test-pagination";

type TestComponentConstructor = new (props?: any) => any;

interface TestItem {
	id: string;
	name: string;
	componentClass: TestComponentConstructor;
}

const testConfig: TestItem[] = [
	{id: "name-entry", name: "Name Entry", componentClass: TestNameEntry}
	,{id: "dialog", name: "Dialog", componentClass: TestDialog}
	,{id: "codemirror", name: "CodeMirror Editor", componentClass: TestCodeMirrorEditor}
	,{id: "date-picker", name: "Date Picker", componentClass: TestDatePicker}
	,{id: "pagination", name: "Pagination", componentClass: TestPagination}
	// TODO: add more test cases here
];

interface State {
	testSelected?: string;
}

export class App extends React.Component<any, State> {
	private tests: {[id: string]: TestItem};
	constructor(props) {
		super(props);
		this.state = {
			testSelected: ""
		};
		this.tests = {};
		testConfig.forEach((item) => {
			this.tests[item.id] = item;
		})
	}
	onTestSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
		this.setState({testSelected: event.target.value});
	}
	render() {
		const testComponentClass = (this.tests[this.state.testSelected] ? this.tests[this.state.testSelected].componentClass : null);
		const testElement = (testComponentClass ? React.createElement(testComponentClass): null);
		const testDiv = (testElement ? (<div className="w3-container w3-card-4 w3-border w3-margin-top">{testElement}</div>) : null);
		const testSelectOptions = [(<option key={0} value="" disabled={true}>Choose your test</option>)].concat(testConfig.map((item, index) => {
			return (<option key={index+1} value={item.id}>{item.name}</option>);
		}));
		return (
			<div className="w3-row-padding">
				<div className="w3-half">
					<div>
						<label>Test Selection:</label>
						<select className="w3-select w3-border" value={this.state.testSelected} onChange={this.onTestSelectChange.bind(this)}>
							{testSelectOptions}
						</select>
					</div>
					{testDiv}
				</div>
			</div>
		);
	}
}
