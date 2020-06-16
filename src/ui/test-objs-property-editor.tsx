import React, {useState} from "react";
import {TestingPane} from "./test-common";
import {PropertyDef, PropertyCustomEditor, Editors as EditorsTest, Formatters as FormattersTest} from "./rdg-addons";
import { Editors} from "react-data-grid-addons";
import {Editors as EditorsExt} from "react-data-grid-addons-extension";
import JSONTree from 'react-json-tree';
const ReactDataGrid = require("react-data-grid");
import {uuid, injectCSS} from "./utils";

const {DropDownEditor} = Editors;
const {NumericInputEditor} = EditorsExt;
const {PropertyBasedEditor} = EditorsTest;
const {PropertyBasedFormatter} = FormattersTest;

const issueTypes: Editors.DropDown.OptionItem[] = [
    { id: "bug", value: "Bug" },
    { id: "epic", value: "Epic" },
    { id: "story", value: "Story" }
];
const IssueTypeEditor = <DropDownEditor options={issueTypes} />;
const completeEditor = <NumericInputEditor min={0} max={100} step={2}/>

interface Row {
    id: number;
    title: string | null;
    issueType?: "Bug" | "Epic" | "Story" | null;
    complete?: number | null;
    enabled?: boolean | null;
    settleDate?: string | null;
}

const objs: Row[] = [
    { id: 0, title: "Task 1", issueType: "Bug", complete: 20, enabled: true, settleDate: "2020-04-26" },
    { id: 1, title: "Task 2", issueType: "Story", complete: 40 , enabled: false, settleDate: null },
    { id: 2, title: "Task 3", issueType: "Epic", complete: 60, enabled: true, settleDate: "2020-06-02" }
];

const propertyDefs: PropertyDef[] = [
    {propId: "id", propName: "ID", propType: "string", propReadOnly: true}
    ,{propId: "title", propName: "Title", propType: "string"}
    ,{propId: "issueType", propName: "Task Type", propType: "string"}
    ,{propId: "complete", propName: "Complete", propType: "number"}
    ,{propId: "enabled", propName: "Enabled", propType: "boolean"}
    ,{propId: "settleDate", propName: "Settle Date", propType: "date"}
];

const customEditors: PropertyCustomEditor[] = [
    {propId: "issueType", editor: IssueTypeEditor}
    ,{propId: "complete", editor: completeEditor}
];

const editor = <PropertyBasedEditor customEditors={customEditors}/>
const formatter = <PropertyBasedFormatter/>

const rows = propertyDefs.map(({propId, propName, propType, propReadOnly}) => {  // for each property
    if (!propName) propName = propId;
    const propAtrib = {propId, propName, propType, propReadOnly};
    const o: any = {};
    objs.forEach((obj, index) => {   // for each object
        const column = `object_${index}`;
        const value = obj[propId];
        o[column] = value;
    });
    return {...propAtrib, ...o};
});

const defaultColumnProperties = {
    resizable: true
};

const objColumns: any[] = objs.map((obj, index) => {  // for each object
    return {key: `object_${index}`, name: obj.id, editor, formatter} as any;
})

const columns: any[] = [
    { key: "propName", name: "Property Name"}
].concat(objColumns)
.map(c => ({...c, ...defaultColumnProperties}));

const this_class = `test-objs-property-editor-${uuid()}`;

injectCSS(`
.${this_class} .react-grid-HeaderCell {
    background-color: #87CEEB!important;
    text-align: center!important;
}

.${this_class} .react-grid-Row--even .react-grid-Cell {
    background-color: #f1f1f1!important;
}

.${this_class} .react-grid-Cell {
    text-align: center!important;
}
`);

export default () => {
    const [data, setData] = useState<any[]>(rows);
    const onGridRowsUpdated = (update: { fromRow: number, toRow: number, updated: any }) => {
        const {fromRow, toRow, updated} = update;
        const rows = data.slice();
        for (let i = fromRow; i <= toRow; i++) {
            rows[i] = { ...rows[i], ...updated };
        }
        setData(rows);
    }
    return (
        <TestingPane testingClassName={this_class}>
            <div className="w3-container w3-tiny w3-margin-top">
                <div style={{width:"75%"}}>
                    <ReactDataGrid
                        columns={columns}
                        rowGetter={(i: number) => data[i]}
                        rowsCount={data.length}
                        minHeight={650}
                        onGridRowsUpdated={onGridRowsUpdated}
                        enableCellSelect={true}
                    />
                </div>
            </div>
        </TestingPane>
    );
}