import React from "react";
import {EditorProps, EditorComponent, Editors} from "react-data-grid-addons-extension";

const {TextInputEditor, NumericInputEditor, CheckboxEditor, DateInputEditor} = Editors;

export type PropertyType = "string" | "number" | "boolean" | "date" | "option";

export interface RowPropAttributes {
    propId: string;
    propType: PropertyType;
    propName?: string;
}

export interface PropertyCustomEditor {
    propId: string;
    editor: JSX.Element;
}

interface Props extends EditorProps<any, RowPropAttributes> {
    customEditors?: PropertyCustomEditor[];
}

export class PropertyBasedEditor extends React.Component<Props> {
    private refInternalEditor: React.RefObject<HTMLElement>;
    constructor(props: any) {
        super(props);
        this.refInternalEditor = React.createRef<HTMLElement>();
    }
    get InternalEditor() {
        return (this.refInternalEditor.current as any) as EditorComponent;
    }
    getValue() {
        return this.InternalEditor.getValue();
    }
    getInputNode() {
        return this.InternalEditor.getInputNode();
    }
    findCustomEditorByPropId(customEditors: PropertyCustomEditor[], propId: string) {
        if (customEditors && customEditors.length > 0 && propId) {
            for (const pe of customEditors) {
                if (pe.propId === propId) {
                    return pe.editor;
                }
            }
        }
        return null;
    }
    render() {
        const {propId, propType} = this.props.rowData;
        let internalEditor = this.findCustomEditorByPropId(this.props.customEditors, propId);
        const internalEditorProps = {...{ref: this.refInternalEditor as any}, ...this.props};
        if (internalEditorProps.customEditors) {
            delete internalEditorProps.customEditors;
        }
        if (internalEditor === null) {
            if (propType === "string") {
                internalEditor = <TextInputEditor {...internalEditorProps}/>
            } else if (propType === "boolean") {
                internalEditor = <CheckboxEditor {...internalEditorProps}/>
            } else if (propType === "number") {
                internalEditor = <NumericInputEditor {...internalEditorProps}/>
            } else if (propType === "date") {
                internalEditor = <DateInputEditor {...internalEditorProps}/>
            }
        } else {
            internalEditor = React.cloneElement(internalEditor, internalEditorProps);
        }
        return internalEditor;
    }
}