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

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export interface Props {
    accept?: string;
    onFileSelect: (files: File[]) => void;
}

export default (props: ReactProps<Props>) => {
    const [fileSelectId] = useState(`fdd-file-select-${uuid()}`);
    const [mouseOverDropArea, setMouseOverDropArea] = useState(false);
    const [numFilesSelected, setNumFilesSelected] = useState(0);
    const onSelectFileList = (fList: FileList) => {
        const files = [...fList];
        setNumFilesSelected(files.length);
        props.onFileSelect(files);
    }
    let dropAreaClassName = "fdd-file-drop-area";
    if (mouseOverDropArea) {
        dropAreaClassName += " highlight";
    }
    return (
        <div
            className={dropAreaClassName}
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
            <div>({numFilesSelected > 0 ? `${numFilesSelected} file(s) selected` : "no file select"})</div>
            <p>Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region</p>
            <input
                type="file"
                id={fileSelectId}
                multiple={true}
                accept={props.accept}
                style={{display: "none"}}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {onSelectFileList(event.target.files);}}
            />
            <label className="fdd-file-select-button w3-button" htmlFor={fileSelectId}>Select some files</label>
        </div>
    );
}