import React, {useState} from "react";
import TestingPane from "./testing-pane";
import FilesDragDrop from "./file-drag-drop";
import {uuid, injectCSS} from "./utils";

//const accept = "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml";
const accept = ".xlsx";

const this_class = `test-file-drag-drop-${uuid()}`;

injectCSS(`
.${this_class} .fdd-file-drop-area {
    border: 2px dashed #ccc;
    border-radius: 20px;
    padding: "20px";
}
.${this_class} .fdd-file-drop-area.highlight {
    border-color: purple;
}
.${this_class} .fdd-file-select-button {
    background: #2196F3;
    color: #fff;
    border-radius: 4px;
}
`);

export default () => {
    return (
        <TestingPane className={this_class}>
            <div>No Config</div>
            <FilesDragDrop
                accept={accept}
                onFileSelect={(files) => {
                    const names = files.map(({name})=> name);
                    console.log(`names=${names}`);
                }}
            />
        </TestingPane>
    )
}