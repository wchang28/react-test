import React, {useState} from "react";
import {Editors} from "react-data-grid-addons";
import PropertyGridEditor, {PropertyDef, PropertyCustomEditor, PatchItem} from "./property-grid-editor";
import {Editors as EditorsExt} from "react-data-grid-addons-extension";
import {TestingPane, ConfigurationPane, FontSize, getFontSizeSelector, FontSizeColorTestingWrapper, getNumberInput, getTextInput} from "./test-common";
import {uuid, injectCSS} from "./utils";
import JSONTree from 'react-json-tree';

const propertyDefs: PropertyDef[] = [
    {propId: "id", propName: "ID", propType: "string", propReadOnly: true}
    ,{propId: "title", propName: "Title", propType: "string"}
    ,{propId: "issueType", propName: "Issue Type", propType: "string"}
    ,{propId: "complete", propName: "Complete", propType: "number"}
    ,{propId: "enabled", propName: "Enabled", propType: "boolean"}
    ,{propId: "settleDate", propName: "Settle Date", propType: "date"}
];

const {DropDownEditor} = Editors;
const {NumericInputEditor} = EditorsExt;

const issueTypes: Editors.DropDown.OptionItem[] = [
    { id: "bug", value: "Bug" },
    { id: "epic", value: "Epic" },
    { id: "story", value: "Story" }
];
const IssueTypeEditor = <DropDownEditor options={issueTypes} />;
const completeEditor = <NumericInputEditor min={0} max={100} step={2}/>

const customEditors: PropertyCustomEditor[] = [
    {propId: "issueType", editor: IssueTypeEditor}
    ,{propId: "complete", editor: completeEditor}
];

interface Row {
    id: number;
    title: string | null;
    issueType?: "Bug" | "Epic" | "Story" | null;
    complete?: number | null;
    enabled?: boolean | null;
    settleDate?: string | null;
}

const rows: Row[] = [
    { id: 0, title: "Task 1", issueType: "Bug", complete: 20, enabled: true, settleDate: "2020-04-26" },
    { id: 1, title: "Task 2", issueType: "Story", complete: 40 , enabled: false, settleDate: null },
    { id: 2, title: "Task 3", issueType: "Epic", complete: 60, enabled: true, settleDate: "2020-06-02" }
];

const this_class = `test-objs-property-editor-${uuid()}`;

injectCSS(`
.${this_class} .react-grid-HeaderCell {
    background-color: #87CEEB!important;
    text-align: center!important;
}

.${this_class} .react-grid-Row--even .react-grid-Cell {
    background-color: #f1f1f1!important;
}

.${this_class} .react-grid-Cell {
    text-align: center!important;
}
`);

export default () => {
    const [objs, setObjs] = useState<any[]>(rows);
    const [patches, setPatches] = useState<PatchItem[]>([]);
    const [heading, setHeading] = useState("Property");
    const [minHeight, setMinHeight] = useState(350);
    const [fontSize, setFontSize] = useState<FontSize>("medium");
    return (
        <TestingPane testingClassName={this_class}>
            <ConfigurationPane>
                {getTextInput("heading", heading, setHeading)}
                {getNumberInput("minHeight", minHeight, setMinHeight)}
                {getFontSizeSelector(fontSize, setFontSize)}
            </ConfigurationPane>
            <div className="w3-container">
                <FontSizeColorTestingWrapper fontSize={fontSize}>
                    <div className="w3-margin-top" style={{width:"75%"}}>
                        <PropertyGridEditor
                            objs={objs}
                            propertyDefs={propertyDefs}
                            customEditors={customEditors}
                            onChange={setObjs}
                            onPatch={setPatches}
                            minHeight={minHeight}
                            heading={heading}
                            objColumnHeader={(obj: Row) => obj.id.toString()}
                        />
                    </div>
                    <div className="w3-margin-top" style={{width:"50%"}}>
                        <div>objs:</div>
                        <JSONTree data={objs} />
                    </div>
                    <div className="w3-margin-top" style={{width:"50%"}}>
                        <div>onPatch(patches):</div>
                        <JSONTree data={patches} />
                    </div>
                </FontSizeColorTestingWrapper>
            </div>
        </TestingPane>
    );
}