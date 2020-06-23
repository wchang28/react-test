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
                    <div>
                        <Checkbox checked={checked} onChange={setChecked}/>{' '}<label>New checkbox</label>
                    </div>
                    <div>
                        <input className="w3-check" type="checkbox" checked={checked} onClick={() => setChecked(!checked)} />{' '}<label>Old checkbox</label>
                    </div>
                </FontSizeColorTestingWrapper>
            </div>
        </TestingPane>
    );
}