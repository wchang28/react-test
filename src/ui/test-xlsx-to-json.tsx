import React from "react";
import {TestingPane, FontSizeColorTestingWrapper} from "./test-common";
import FileDragDropSelect, {CLASS_PREFIX as CTRL_CLASS_PREFIX} from "./file-drag-drop-select";
import {uuid, injectCSS} from "./utils";
import XLSX2JSON from "./browser-xlsx-to-json";

const this_class = `test-xlsx-to-json-${uuid()}`;

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
    const onFileSelect = async (files: File[]) => {
        if (files.length === 1) {
            const o = await XLSX2JSON(files[0]);
            console.log(JSON.stringify(o, null, 2));
        }
    }
    return (
        <TestingPane testingClassName={this_class}>
            <div style={{width:"50%"}}>
                <FontSizeColorTestingWrapper fontSize={"small"}>
                    <FileDragDropSelect
                        accept=".xlsx"
                        multiple={false}
                        onFileSelect={onFileSelect}
                    />
                </FontSizeColorTestingWrapper>
            </div>
        </TestingPane>
    );
}