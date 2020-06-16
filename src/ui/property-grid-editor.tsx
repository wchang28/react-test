import * as React from "react";
import {ReactNode} from "react";
import {PropertyDef, PropertyCustomEditor, PropertyCustomFormatter, Editors, Formatters} from "react-data-grid-addons-extension";
const ReactDataGrid = require("react-data-grid");

const {PropertyBasedEditor} = Editors;
const {PropertyBasedFormatter} = Formatters;

const defaultColumnProperties = {
    resizable: true
};

export interface Props {
    objs: any[];
    propertyDefs: PropertyDef[];
    onChange: (objs: any[]) => void;
    customEditors?: PropertyCustomEditor[];
    customFormatters?: PropertyCustomFormatter[];
    propertyNameHeader?: string;
    objColumnHeader?: (obj: any) => string;
    minHeight?: number;
}

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export default (props: ReactProps<Props>) => {
    const {objs, propertyDefs, onChange, customEditors, customFormatters, propertyNameHeader, objColumnHeader, minHeight} = props;
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
        { key: "propName", name: propertyNameHeader ? propertyNameHeader : "Property"}
    ].concat(objColumns)
    .map(c => ({...c, ...defaultColumnProperties}));
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    const onGridRowsUpdated = (update: { fromRow: number, toRow: number, updated: any }) => {
        const {fromRow, toRow, updated} = update;
        console.log(`onGridRowsUpdated(): fromRow=${fromRow}, toRow=${toRow}, updated=${JSON.stringify(updated)}`);
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
                const propId = row["propId"];
                o[propId] = row[valueKey];
            }
            const newObj = {...oldObj, ...o};
            newObjs.push(newObj);
        }
        ////////////////////////////////////////////////////////////////////////////////////////
        onChange(newObjs);
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