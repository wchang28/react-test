import React, {useState} from "react";
import {FontSize, getFontSizeSelector, getNumberInput, TestingPane, ConfigurationPane, getCheckbox, FontSizeColorTestingWrapper, getTestDiv} from "./test-common";
import ScrollView from "./scroll-view";

export default () => {
    const [widthPx, setWidthPx] = useState(150);
    const [heightPx, setHeightPx] = useState(200);
    const [fontSize, setFontSize] = useState<FontSize>("small");
    const [hasBorder, setHasBorder] = useState(false);
    const props = {width: `${widthPx}px`, height: `${heightPx}px`, hasBorder};
    return (
        <TestingPane>
            <ConfigurationPane>
                {getNumberInput("Width (px)", widthPx, setWidthPx)}
                {getNumberInput("Height (px)", heightPx, setHeightPx)}
                {getCheckbox("Border", hasBorder, setHasBorder)}
                {getFontSizeSelector(fontSize, setFontSize)}
            </ConfigurationPane>
            <FontSizeColorTestingWrapper fontSize={fontSize}>
                <ScrollView {...props}>{getTestDiv("light-grey")}</ScrollView>
            </FontSizeColorTestingWrapper>
        </TestingPane>
    );
};