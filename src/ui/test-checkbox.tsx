import React, {useState} from "react";
import {FontSize, getFontSizeSelector, getCheckbox, TestingPane, ConfigurationPane, FontSizeColorTestingWrapper} from "./test-common";

export default () => {
    const [fontSize, setFontSize] = useState<FontSize>("medium");
    return (
        <TestingPane testingClassName={this_class}>
            <ConfigurationPane>
                {getCheckbox("Allow Muitiple", multiple, setMultiple)}
                {getFontSizeSelector(fontSize, setFontSize)}
            </ConfigurationPane>
            <div className="w3-container" style={{width:"50%"}}>
                <FontSizeColorTestingWrapper fontSize={fontSize}>
                    <FileDragDropSelect
                        accept={accept}
                        multiple={multiple}
                        onFileSelect={(files) => {
                            const names = files.map(({name})=> name);
                            console.log(`names=${names}`);
                        }}
                    />
                </FontSizeColorTestingWrapper>
            </div>
        </TestingPane>
    );
}