import * as React from "react";
import {ReactNode} from "react";
import {PropertyDef, PropertyCustomEditor, PropertyCustomFormatter, Editors, Formatters} from "react-data-grid-addons-extension";
const ReactDataGrid = require("react-data-grid");

const {PropertyBasedEditor} = Editors;
const {PropertyBasedFormatter} = Formatters;

const defaultColumnProperties = {
    resizable: true
};

export interface PatchItem {
    index: number;
    patch: any;
};

export interface Props {
    objs: any[];
    propertyDefs: PropertyDef[];
    onChange?: (objs: any[]) => void;
    onPatch?: (patches: PatchItem[]) => void;
    customEditors?: PropertyCustomEditor[];
    customFormatters?: PropertyCustomFormatter[];
    heading?: string;
    objColumnHeader?: (obj: any) => string;
    minHeight?: number;
}

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export default (props: ReactProps<Props>) => {
    const {objs, propertyDefs, onChange, onPatch, customEditors, customFormatters, heading, objColumnHeader, minHeight} = props;
    const editor = <PropertyBasedEditor customEditors={customEditors}/>
    const formatter = <PropertyBasedFormatter customFormatters={customFormatters}/>
    // pivot objs to rows
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
    // build columns
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    const objColumns: any[] = objs.map((obj, index) => {  // for each object
        return {key: `object_${index}`, name: (objColumnHeader ? objColumnHeader(obj) : "Value"), editor, formatter} as any;
    });
    const columns: any[] = [
        { key: "propName", name: heading ? heading : ""}
    ].concat(objColumns)
    .map(c => ({...c, ...defaultColumnProperties}));
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    const onGridRowsUpdated = (update: { fromRow: number, toRow: number, updated: any }) => {
        const {fromRow, toRow, updated} = update;
        //console.log(`onGridRowsUpdated(): fromRow=${fromRow}, toRow=${toRow}, updated=${JSON.stringify(updated)}`);
        const rowsCopy = rows.slice();
        for (let i = fromRow; i <= toRow; i++) {
            rowsCopy[i] = { ...rowsCopy[i], ...updated };
        }
        // un-pivot back to objects
        ////////////////////////////////////////////////////////////////////////////////////////
        const numObjects = objs.length;
        const newObjs: any = [];
        for (let i = 0; i < numObjects; i++) {  // for each object
            const valueKey = `object_${i}`;
            const oldObj = objs[i];
            const o = {};
            for (const row of rowsCopy) {   // for each row/property
                const {propId} = (row as PropertyDef);
                o[propId] = row[valueKey];
            }
            const newObj = {...oldObj, ...o};
            newObjs.push(newObj);
        }
        ////////////////////////////////////////////////////////////////////////////////////////
        if (onChange) {
            onChange(newObjs);
        }
        // notifying object being patched
        ////////////////////////////////////////////////////////////////////////////////////////
        const patches: PatchItem[] = [];
        for (const key of Object.keys(updated)) {   // for each object
            const x = key.indexOf("_");
            if (x !== -1) {
                const index = parseInt(key.substr(x+1));
                const value = updated[key];
                const patch = {};
                for (let rowindex=fromRow; rowindex <= toRow; rowindex++) { // for each property
                    const {propId} = rows[rowindex] as PropertyDef;
                    patch[propId] = value;
                }
                patches.push({index, patch});
            }
        }
        if (onPatch) {
            onPatch(patches);
        }
        ////////////////////////////////////////////////////////////////////////////////////////
    };
    return (
        <ReactDataGrid
            columns={columns}
            rowGetter={(i: number) => rows[i]}
            rowsCount={rows.length}
            minHeight={minHeight}
            onGridRowsUpdated={onGridRowsUpdated}
            enableCellSelect={true}
        />
    )
}

export {PropertyDef, PropertyCustomEditor, PropertyCustomFormatter};