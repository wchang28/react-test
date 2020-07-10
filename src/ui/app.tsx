import * as React from 'react';
import {useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import CollapsibleLeftPaneView from "./collapsible-left-pane-view";
import {Test as TestNameEntry} from "./test-name-entry";
import TestDialog from "./test-dialog";
import {Test as TestInformationModal} from "./test-information-modal";
import {Test as TestTestNoConfirm} from "./test-yes-no-confirm";
import TestTestNoConfirmPromise from "./test-yes-no-confirm-promise";
import {Test as TestCodeMirrorEditor} from "./test-codemirror";
//import {Test as TestDatePicker} from "./test-date-picker";
import {Test as TestSplitterView} from "./test-splitter-view";
import {Test as TestButtonPadding} from "./test-button-padding";
import TestAlert from "./test-alert";
import TestReactDataGrid from "./test-react-data-grid";
import {Test as TestNestingRouting} from "./test-nesting-routing";
import {default as TestComponentLifecycle} from "./test-component-lifecycle";	// import a default export (old method)
import TestFunctionalHooks from "./test-functional-hooks";						// import a default export (with tsconfig.json with compilerOptions.esModuleInterop=true)
import TestCollapsibleLeftPaneView from "./test-collapsible-left-pane-view";
import TestFileDragDropSelect from "./test-file-drag-drop-select";
import TestXLSX2JSON from "./test-xlsx-to-json";
import TestCSV2JSON from "./test-csv-to-json";
import TestJumpToRoute from "./test-jump-to-route";
import TestObjsPropertyEditor from "./test-objs-property-editor";
import TestCheckbox from "./test-checkbox";
import TestPolling from "./test-polling";
import TestReactHTMLParser from "./test-react-html-parser";
import TestPaginate from "./test-paginate";
import TestAutoSuggest from "./test-autosuggest"

interface TestItem {
	id: string;
	name: string;
	component: any;
}

const testConfig: TestItem[] = [
	{id: "auto-suggest", name: "Auto-Suggest", component: TestAutoSuggest}
	,{id: "paginate", name: "Paginate", component: TestPaginate}
	,{id: "xlsx-to-json", name: "XLSX to JSON", component: TestXLSX2JSON}
	,{id: "csv-to-json", name: "CSV to JSON", component: TestCSV2JSON}
	,{id: "component-lifecycle", name: "Component Lifecycle", component: TestComponentLifecycle}
	,{id: "nesting-routing", name: "Nesting Routing", component: TestNestingRouting}
	,{id: "jump-to-route", name: "Jump to Route", component: TestJumpToRoute}
	,{id: "react-data-grid", name: "Data Grid", component: TestReactDataGrid}
	,{id: "objs-property-editor", name: "Objects Property Editor", component: TestObjsPropertyEditor}
	,{id: "name-entry", name: "Name Entry", component: TestNameEntry}
	,{id: "dialog", name: "Dialog", component: TestDialog}
	,{id: "information-modal", name: "Information Modal Box", component: TestInformationModal}
	,{id: "yes-no-confirm", name: "Yes/No Confirmation", component: TestTestNoConfirm}
	,{id: "yes-no-confirm-promise", name: "Yes/No Confirmation (Promise)", component: TestTestNoConfirmPromise}
	,{id: "codemirror", name: "CodeMirror Editor", component: TestCodeMirrorEditor}
	//,{id: "date-picker", name: "Date Picker", component: TestDatePicker}
	,{id: "splitter-view", name: "Splitter View", component: TestSplitterView}
	,{id: "button-padding", name: "Button Padding", component: TestButtonPadding}
	,{id: "alert", name: "Alert", component: TestAlert}
	,{id: "functional-hooks", name: "Functional Hooks", component: TestFunctionalHooks}
	,{id: "collapsible-left-pane-view", name: "Collapsible Left Pane View", component: TestCollapsibleLeftPaneView}
	,{id: "file-drag-drop-select", name: "File Drag Drop Select", component: TestFileDragDropSelect}
	,{id: "checkbox", name: "Checkbox", component: TestCheckbox}
	,{id: "polling", name: "Polling", component: TestPolling}
	,{id: "react-html-parser", name: "React HTML Parser", component: TestReactHTMLParser}
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
	const [collapsed, setCollapsed] = useState(false);
	return (
		<Router>
			<CollapsibleLeftPaneView
				collapsed={collapsed}
				onCollapseChanged={setCollapsed}
			>
				<div className="w3-container w3-small">
					<div className="w3-medium w3-teal w3-border" style={{fontWeight: "bold"}}>
						Test Selection
					</div>
					<div>
						{links}
					</div>
				</div>
				<div>
					<Switch>
						<Route key={0} exact path="/">
							<div className="w3-container" style={{fontWeight: "bold"}}>
								Please select a test from the left.
							</div>
						</Route>
						{routes}
					</Switch>
				</div>
			</CollapsibleLeftPaneView>
		</Router>
	);
}