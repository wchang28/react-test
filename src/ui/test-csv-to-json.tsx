import React, {useState} from "react";
import {TestingPane} from "./test-common";
import FileDragDropSelect, {CLASS_PREFIX as CTRL_CLASS_PREFIX} from "./file-drag-drop-select";
import {uuid, injectCSS} from "./utils";
import CSV2JSON from "./browser-csv-to-json";
import JSONTree from 'react-json-tree';

const this_class = `test-csv-to-json-${uuid()}`;

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
    const [data, setData] = useState<any>(null);
    const onFileSelect = async (files: File[]) => {
        if (files.length === 1) {
            const o = await CSV2JSON(files[0]);
            console.log(JSON.stringify(o, null, 2));
            setData(o);
        }
    }
    return (
        <TestingPane testingClassName={this_class}>
            <div className="w3-small" style={{width:"50%"}}>
                <FileDragDropSelect
                    accept=".csv"
                    multiple={false}
                    onFileSelect={onFileSelect}
                />
                <div className="w3-margin-top">
                    <JSONTree data={data} />
                </div>
            </div>
        </TestingPane>
    );
}