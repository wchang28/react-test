import React, {useState} from "react";
import TestingPane from "./testing-pane";
import FileDragDropSelect, {CLASS_PREFIX as CTRL_CLASS_PREFIX} from "./file-drag-drop-select";
import {uuid, injectCSS} from "./utils";

//const accept = "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml";
const accept = ".xlsx";

const this_class = `test-file-drag-drop-select-${uuid()}`;

injectCSS(`
.${this_class} .${CTRL_CLASS_PREFIX}-file-drop-area {
    border: 2px #ccc;
    border-radius: 10px;
    padding: "20px";
}
.${this_class} .${CTRL_CLASS_PREFIX}-file-drop-area.highlight {
    border-color: purple;
}
.${this_class} .${CTRL_CLASS_PREFIX}-file-select-button {
    background: #2196F3;
    color: #fff;
    border-radius: 4px;
}
`);

export default () => {
    const [multiple, setMultiple] = useState(true);
    return (
        <TestingPane className={this_class}>
            <div>
                <p>
                    <input className="w3-check" type="checkbox" checked={multiple} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setMultiple(event.target.checked);}}/>
                    <label>Allow Muitiple</label>
                </p>
            </div>
            <FileDragDropSelect
                accept={accept}
                multiple={multiple}
                onFileSelect={(files) => {
                    const names = files.map(({name})=> name);
                    console.log(`names=${names}`);
                }}
            />
        </TestingPane>
    )
}