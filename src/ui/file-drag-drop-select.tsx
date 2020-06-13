import * as React from "react";
import {ReactNode, useState, ChangeEvent, DragEvent} from "react";

function uuid() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function getDefaultInstruction(allowMultiple: boolean) {
    return `Select ${allowMultiple ? "multiple files" : "a file"} by clicking the button below or by dragging and dropping ${allowMultiple ? "files": "a file"} onto the dashed region.`;
}

function getDefaultFileSelectButtonText(allowMultiple: boolean) {
    return `Select file${allowMultiple ? "s" : ""}`;
}

export const CLASS_PREFIX = "fdds";

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export interface Props {
    accept?: string;
    multiple?: boolean;
    instruction?: string;
    fileSelectButtonText?: string;
    onFileSelect: (files: File[]) => void;
}

export default (props: ReactProps<Props>) => {
    const allowMultiple = (typeof props.multiple === "boolean" ? props.multiple : false);
    const instruction = (props.instruction ? props.instruction : getDefaultInstruction(allowMultiple));
    const fileSelectButtonText = (props.fileSelectButtonText ? props.fileSelectButtonText : getDefaultFileSelectButtonText(allowMultiple));
    const [fileSelectId] = useState(`${CLASS_PREFIX}-file-select-${uuid()}`);
    const [mouseOverDropArea, setMouseOverDropArea] = useState(false);
    const onSelectFileList = (fList: FileList) => {
        let files = [...fList];
        if (!allowMultiple) {
            files = [files[0]];
        }
        props.onFileSelect(files);
    }
    let dropAreaClassName = `${CLASS_PREFIX}-file-drop-area`;
    if (mouseOverDropArea) {
        dropAreaClassName += " highlight";
    }
    return (
        <div
            className={dropAreaClassName}
            style={{borderStyle: "dashed"}}
            onDragEnter={(event: DragEvent<HTMLDivElement>) => {
                setMouseOverDropArea(true);
                event.preventDefault();
                event.stopPropagation()
            }}
            onDragOver={(event: DragEvent<HTMLDivElement>) => {
                setMouseOverDropArea(true);
                event.preventDefault();
                event.stopPropagation()
            }}
            onDragLeave={(event: DragEvent<HTMLDivElement>) => {
                setMouseOverDropArea(false);
                event.preventDefault();
                event.stopPropagation()
            }}
            onDrop={(event: DragEvent<HTMLDivElement>) => {
                setMouseOverDropArea(false);
                onSelectFileList(event.dataTransfer.files);
                event.preventDefault();
                event.stopPropagation()
            }}
        >
            <p>{instruction}</p>
            <input
                type="file"
                id={fileSelectId}
                multiple={props.multiple}
                accept={props.accept}
                style={{display: "none"}}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {onSelectFileList(event.target.files);}}
            />
            <label className={`${CLASS_PREFIX}-file-select-button w3-button`} htmlFor={fileSelectId}>{fileSelectButtonText}</label>
        </div>
    );
}