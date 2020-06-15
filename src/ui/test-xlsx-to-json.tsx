import React from "react";
import {TestingPane} from "./test-common";
import FileDragDropSelect from "./file-drag-drop-select";
import XLSX2JSON from "./browser-xlsx-to-json";

export default () => {
    const onFileSelect = async (files: File[]) => {
        if (files.length === 1) {
            const o = await XLSX2JSON(files[0]);
            console.log(JSON.stringify(o, null, 2));
        }
    }
    return (
        <TestingPane>
            <div style={{width:"50%"}}>
                <FileDragDropSelect
                    accept=".xlsx"
                    multiple={false}
                    onFileSelect={onFileSelect}
                />
            </div>
        </TestingPane>
    );
}