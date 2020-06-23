import React, {useState} from "react";
import {FontSize, getFontSizeSelector, getCheckbox, TestingPane, ConfigurationPane, FontSizeColorTestingWrapper} from "./test-common";
import Checkbox from "./checkbox";

export default () => {
    const [checked, setChecked] = useState(false);
    const [fontSize, setFontSize] = useState<FontSize>("medium");
    return (
        <TestingPane>
            <ConfigurationPane>
                 {getFontSizeSelector(fontSize, setFontSize)}
            </ConfigurationPane>
            <div className="w3-container" style={{width:"50%"}}>
                <FontSizeColorTestingWrapper fontSize={fontSize}>
                    <Checkbox checked={checked} onChange={setChecked}/>{' '}<label>Please check/un-check me</label>
                </FontSizeColorTestingWrapper>
            </div>
        </TestingPane>
    );
}