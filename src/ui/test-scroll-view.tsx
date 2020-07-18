import React, {useState} from "react";
import {FontSize, getFontSizeSelector, getNumberInput, TestingPane, ConfigurationPane, FontSizeColorTestingWrapper, getTestDiv} from "./test-common";
import ScrollView from "./scroll-view";

export default () => {
    const [widthPx, setWidthPx] = useState(150);
    const [heightPx, setHeightPx] = useState(200);
    const [fontSize, setFontSize] = useState<FontSize>("small");
    return (
        <TestingPane>
            <ConfigurationPane>
                {getNumberInput("Width (px)", widthPx, setWidthPx)}
                {getNumberInput("Height (px)", heightPx, setHeightPx)}
                {getFontSizeSelector(fontSize, setFontSize)}
            </ConfigurationPane>
            <FontSizeColorTestingWrapper fontSize={fontSize}>
                <div className="w3-clear" style={{border: "1px solid #ccc", width: `${widthPx}px`}}>
                    <ScrollView width="100%" height={`${heightPx}px`}>{getTestDiv("light-grey")}</ScrollView>
                </div>
            </FontSizeColorTestingWrapper>
        </TestingPane>
    );
};