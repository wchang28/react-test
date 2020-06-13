import React, {useState} from "react";
import TestingPane from "./testing-pane";
import FilesDragDrop from "./file-drag-drop";

//const accept = "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml";
const accept = "application/vnd.openxmlformats-officedocument.spreadsheetml";

export default () => {
    return (
        <TestingPane>
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