import React, {useState} from "react";
import {TestingPane} from "./test-common";
import {RowPropAttributes, PropertyBasedEditor} from "./PropertyBasedEditor";
import JSONTree from 'react-json-tree';
const ReactDataGrid = require("react-data-grid");
import {uuid, injectCSS} from "./utils";

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

const rowsPropAtrib: RowPropAttributes[] =[
    {propId: "title", propType: "string"}
    ,{propId: "issueType", propType: "string"}
    ,{propId: "complete", propType: "number"}
    ,{propId: "enabled", propType: "boolean"}
    ,{propId: "settleDate", propType: "date"}
];

const rows = rowsPropAtrib.map(({propId, propName, propType}) => {  // for each property
    if (!propName) propName = propId;
    const propAtrib = {propId, propName, propType};
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
    return {key: `object_${index}`, name: obj.id, editor: PropertyBasedEditor} as any;
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