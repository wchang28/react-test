import * as React from 'react';
import { Editors} from "react-data-grid-addons";
import { orderBy } from '@progress/kendo-data-query';
import {Editors as EditorsExt, Formatters as FormattersExt} from "react-data-grid-addons-extension";
const ReactDataGrid = require("react-data-grid");
import {uuid, injectCSS} from "./utils";

const { DropDownEditor} = Editors;
const { CheckboxEditor, DateInputEditor, NumericInputEditor, TextInputEditor} = EditorsExt;
const { CheckboxFormatter, SimpleCellFormatter } = FormattersExt;

const issueTypes: Editors.DropDown.OptionItem[] = [
    { id: "bug", value: "Bug" },
    { id: "epic", value: "Epic" },
    { id: "story", value: "Story" }
];
const IssueTypeEditor = <DropDownEditor options={issueTypes} />;

const completeEditor = <NumericInputEditor min={0} max={100} step={2}/>

const defaultColumnProperties = {
    resizable: true
    ,sortable: true
};

const columns = [
    { key: "id", name: "ID" },
    //{ key: "title", name: "Title", editable: true},
    { key: "title", name: "Title", formatter: SimpleCellFormatter, editor: TextInputEditor},
    { key: "complete", name: "Complete", editor: completeEditor},
    { key: "enabled", name: "Enabled", formatter: CheckboxFormatter, editor: CheckboxEditor},
    { key: "issueType", name: "Task Type", editor: IssueTypeEditor},
    { key: "settleDate", name: "Settle Date", editor: DateInputEditor}
].map(c => ({...c, ...defaultColumnProperties}));

interface Row {
    id: number;
    title: string | null;
    issueType?: "Bug" | "Epic" | "Story" | null;
    complete?: number | null;
    enabled?: boolean | null;
    settleDate?: string | null;
}

const rows: Row[] = [
    { id: 0, title: "Task 1", issueType: "Bug", complete: 20, enabled: true, settleDate: "2020-04-26" },
    { id: 1, title: "Task 2", issueType: "Story", complete: 40 , enabled: false, settleDate: null },
    { id: 2, title: "Task 3", issueType: "Epic", complete: 60, enabled: true, settleDate: "2020-06-02" }
];

interface State {
    rows: Row[];
}

const this_class = `test-react-data-grid-${uuid()}`;

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

export class Test extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            rows
        };
    }
    onGridRowsUpdated = (update: { fromRow: number, toRow: number, updated: any }) => {
        const {fromRow, toRow, updated} = update;
        this.setState(state => {
            const rows = state.rows.slice();
            for (let i = fromRow; i <= toRow; i++) {
                rows[i] = { ...rows[i], ...updated };
            }
            return { rows };
        });
    };
    onGridSort = (sortColumn: string, sortDirection: string) => {
        if (sortDirection === "NONE") {
            sortDirection = "ASC";
            sortColumn = "id";
        }
        const rows = orderBy(this.state.rows, [{ field: sortColumn, dir: sortDirection.toLowerCase() as any}]);
        this.setState({rows});
    }
    render() {
        return (
            <div className={`${this_class} w3-tiny w3-card-4`}>
                <ReactDataGrid
                    columns={columns}
                    rowGetter={(i: number) => this.state.rows[i]}
                    rowsCount={3}
                    minHeight={650}
                    onGridRowsUpdated={this.onGridRowsUpdated}
                    enableCellSelect={true}
                    onGridSort={this.onGridSort}
                />
            </div>
        );
    }
}