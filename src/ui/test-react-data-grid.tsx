import React, {useState, ReactNode} from 'react';
import { Editors, Menu} from "react-data-grid-addons";
import { orderBy } from '@progress/kendo-data-query';
import {Editors as EditorsExt, Formatters as FormattersExt} from "react-data-grid-addons-extension";
const ReactDataGrid = require("react-data-grid");
import {uuid, injectCSS} from "./utils";

export type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

const { DropDownEditor} = Editors;
const { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } = Menu;
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
    { key: "issueType", name: "Issue Type", editor: IssueTypeEditor},
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

const data: Row[] = [
    { id: 0, title: "Task 1", issueType: null, complete: 20, enabled: true, settleDate: "2020-04-26" },
    { id: 1, title: "Task 2", issueType: "Story", complete: 40 , enabled: false, settleDate: null },
    { id: 2, title: "Task 3", issueType: "Epic", complete: 60, enabled: null, settleDate: "2020-06-02" },
    { id: 3, title: "Task 4", issueType: "Bug", complete: null, enabled: false, settleDate: "2020-03-25" }
];

function createFakeRow() {
    const row: Row = {id: 299,title: "Task 300"};
    return row;
}

interface ContextMenuProps {
    idx?: number;    // column
    id?: string;     // id of the content menu
    rowIdx?: number; // row index
}

interface MenuItemData {
    idx?: number;    // column
    rowIdx?: number; // row index
}

interface EditContextMenuProps extends ContextMenuProps {
    onRowDelete: (e: any, data: MenuItemData) => void;
    onRowInsertAbove: (e: any, data: MenuItemData) => void;
    onRowInsertBelow: (e: any, data: MenuItemData) => void;
}

function EditContextMenu(props: ReactProps<EditContextMenuProps>) {
    const {idx, id, rowIdx, onRowDelete, onRowInsertAbove, onRowInsertBelow} = props;
    return (
        <ContextMenu id={id}>
            <MenuItem data={{ rowIdx, idx }} onClick={onRowDelete}>
                Delete Row
            </MenuItem>
            <SubMenu title="Insert Row">
                <MenuItem data={{ rowIdx, idx }} onClick={onRowInsertAbove}>
                    Above
                </MenuItem>
                <MenuItem data={{ rowIdx, idx }} onClick={onRowInsertBelow}>
                    Below
                </MenuItem>
            </SubMenu>
        </ContextMenu>
    );
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

injectCSS(`
.${this_class} .react-contextmenu {
    min-width: 120px;
    padding: 5px 0;
    margin: 2px 0 0;
    font-size: 10px;
    color: #373a3c;
    text-align: left;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    outline: none;
    opacity: 0;
    pointer-events: none;
    transition: opacity 250ms ease !important;
}
  
.${this_class} .react-contextmenu.react-contextmenu--visible {
    opacity: 1;
    pointer-events: auto;
}

.${this_class} .react-contextmenu-item {
    padding: 3px 20px;
    font-weight: 400;
    line-height: 1.5;
    color: #373a3c;
    text-align: inherit;
    white-space: nowrap;
    background: 0 0;
    border: 0;
    cursor: pointer;
}

.${this_class} .react-contextmenu-item.react-contextmenu-item--active,
.${this_class} .react-contextmenu-item.react-contextmenu-item--selected {
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
    text-decoration: none;
}

.${this_class} .react-contextmenu-item.react-contextmenu-item--disabled,
.${this_class} .react-contextmenu-item.react-contextmenu-item--disabled:hover {
    color: #878a8c;
    background-color: transparent;
    border-color: rgba(0, 0, 0, 0.15);
}

.${this_class} .react-contextmenu-item--divider {
    margin-bottom: 3px;
    padding: 2px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    cursor: inherit;
}
.${this_class} .react-contextmenu-item--divider:hover {
    background-color: transparent;
    border-color: rgba(0, 0, 0, 0.15);
}

.${this_class} .react-contextmenu-item.react-contextmenu-submenu {
    padding: 0;
}

.${this_class} .react-contextmenu-item.react-contextmenu-submenu > .react-contextmenu-item {
}

.${this_class} .react-contextmenu-item.react-contextmenu-submenu
> .react-contextmenu-item:after {
    content: "▶";
    display: inline-block;
    position: absolute;
    right: 7px;
}
`);

export default () => {
    const [rows, setRows] = useState(data);
    const onGridRowsUpdated = (update: { fromRow: number, toRow: number, updated: any }) => {
        const {fromRow, toRow, updated} = update;
        const data = rows.slice();
        for (let i = fromRow; i <= toRow; i++) {
            data[i] = { ...data[i], ...updated };
        }
        setRows(data);
    };
    const onGridSort = (sortColumn: string, sortDirection: string) => {
        if (sortDirection === "NONE") {
            sortDirection = "ASC";
            sortColumn = "id";
        }
        const data = orderBy<Row>(rows, [{ field: sortColumn, dir: sortDirection.toLowerCase() as any}]);
        setRows(data);
    };
    const deleteRow = (rowIdx: number) => (rows: Row[]) => {
        const nextRows = [...rows];
        nextRows.splice(rowIdx, 1);
        return nextRows;
    };
    const insertRow = (rowIdx: number) => (rows: Row[]) => {
        const newRow = createFakeRow();
        const nextRows = [...rows];
        nextRows.splice(rowIdx, 0, newRow);
        return nextRows;
    };
    const onRowDelete = (e: any, data: MenuItemData) => {
        const {rowIdx, idx} = data;
        console.log(`rowIdx=${rowIdx}, idx=${idx}, e=${e}`);
        setRows(deleteRow(rowIdx));
    }
    return (
        <div className={`${this_class} w3-tiny w3-card-4`}>
            <ReactDataGrid
                columns={columns}
                rowGetter={(i: number) => rows[i]}
                rowsCount={rows.length}
                minHeight={650}
                onGridRowsUpdated={onGridRowsUpdated}
                enableCellSelect={true}
                onGridSort={onGridSort}
                contextMenu={
                    <EditContextMenu
                      onRowDelete={onRowDelete}
                      onRowInsertAbove={(e, { rowIdx }) => setRows(insertRow(rowIdx))}
                      onRowInsertBelow={(e, { rowIdx }) => setRows(insertRow(rowIdx + 1))}
                    />
                }
                RowsContainer={ContextMenuTrigger}
            />
        </div>
    );
};