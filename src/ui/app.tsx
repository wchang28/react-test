import * as React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import {Test as TestNameEntry} from "./test-name-entry";
import {Test as TestDialog} from "./test-dialog";
import {Test as TestInformationModal} from "./test-information-modal";
import {Test as TestTestNoConfirm} from "./test-yes-no-confirm";
import {Test as TestTestNoConfirmPromise} from "./test-yes-no-confirm-promise";
import {Test as TestCodeMirrorEditor} from "./test-codemirror";
//import {Test as TestDatePicker} from "./test-date-picker";
import {Test as TestPagination} from "./test-pagination";
import {Test as TestSplitterView} from "./test-splitter-view";
import {Test as TestButtonPadding} from "./test-button-padding";
import {Test as TestAlert} from "./test-alert";
import {Test as TestReactDataGrid} from "./test-react-data-grid";
import {Test as TestNestingRouting} from "./test-nesting-routing";
import {default as TestComponentLifecycle} from "./test-component-lifecycle";	// import a default export (old method)
import TestFunctionalHooks from "./test-functional-hooks";						// import a default export (with tsconfig.json with compilerOptions.esModuleInterop=true)
import TestCollapsibleLeftPaneView from "./test-collapsible-left-pane-view";
import TestFileDragDrop from "./test-file-drag-drop";

interface TestItem {
	id: string;
	name: string;
	component: any;
}

const testConfig: TestItem[] = [
	{id: "component-lifecycle", name: "Component Lifecycle", component: TestComponentLifecycle}
	,{id: "nesting-routing", name: "Nesting Routing", component: TestNestingRouting}
	,{id: "react-data-grid", name: "Data Grid", component: TestReactDataGrid}
	,{id: "name-entry", name: "Name Entry", component: TestNameEntry}
	,{id: "dialog", name: "Dialog", component: TestDialog}
	,{id: "information-modal", name: "Information Modal Box", component: TestInformationModal}
	,{id: "yes-no-confirm", name: "Yes/No Confirmation", component: TestTestNoConfirm}
	,{id: "yes-no-confirm-promise", name: "Yes/No Confirmation (Promise)", component: TestTestNoConfirmPromise}
	,{id: "codemirror", name: "CodeMirror Editor", component: TestCodeMirrorEditor}
	//,{id: "date-picker", name: "Date Picker", component: TestDatePicker}
	,{id: "pagination", name: "Pagination", component: TestPagination}
	,{id: "splitter-view", name: "Splitter View", component: TestSplitterView}
	,{id: "button-padding", name: "Button Padding", component: TestButtonPadding}
	,{id: "alert", name: "Alert", component: TestAlert}
	,{id: "functional-hooks", name: "Functional Hooks", component: TestFunctionalHooks}
	,{id: "collapsible-left-pane-view", name: "Collapsible Left Pane View", component: TestCollapsibleLeftPaneView}
	,{id: "file-drag-drop", name: "File Drag Drop", component: TestFileDragDrop}
	// TODO: add more test cases here
];

const links = testConfig.map(({id, name}, index) => {
	return <div key={index}><Link to={`/${id}`}>{name}</Link></div>;
});
const routes = testConfig.map(({id, component}, index) => {
	const Component = component;
	return (
		<Route key={index+1} path={`/${id}`}>
			<Component/>
		</Route>
	);
});

export default () => {
	return (
		<div className="w3-row-padding">
			<div className="w3-half">
				<Router>
					<label>Test Selection:</label>
					<div>
						{links}
					</div>
					<div className="w3-container w3-card-4 w3-border w3-margin-top">
						<Switch>
							<Route key={0} exact path="/">
								<h3>Please select a test.</h3>
							</Route>
							{routes}
						</Switch>
					</div>
				</Router>
			</div>
		</div>
	);
}