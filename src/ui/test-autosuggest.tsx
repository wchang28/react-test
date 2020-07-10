import React, {useState} from "react";
import {TestingPane, ConfigurationPane, getFontSizeSelector, FontSize, FontSizeColorTestingWrapper} from "./test-common";

export default () => {
    const [fontSize, setFontSize] = useState<FontSize>("small")
    return (
        <TestingPane>
            <ConfigurationPane>
                {getFontSizeSelector(fontSize, setFontSize)}
            </ConfigurationPane>
            <FontSizeColorTestingWrapper fontSize={fontSize}>
                <div>
                    Hi
                </div>
            </FontSizeColorTestingWrapper>
        </TestingPane>
    );
};