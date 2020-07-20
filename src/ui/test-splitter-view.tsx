import React, {useState} from 'react';
import {SplitterView} from "./splitter-view";
import ScrollView from "./scroll-view";
import NoOverflowContainer from "./no-overflow-container";
import {TestingPane, ConfigurationPane, getFontSizeSelector, FontSize, getNumberInput, FontSizeColorTestingWrapper, getTestTable} from "./test-common";

export default () => {
    const [testAreaHeightPx, setTestAreaHeightPx] = useState(550);
    const [splitterWidthPx, setSplitterWidthPx] = useState(5);
    const [fontSize, setFontSize] = useState<FontSize>("small");
    return (
        <TestingPane>
            <ConfigurationPane>
                {getNumberInput("Test Area Height (px)", testAreaHeightPx, setTestAreaHeightPx)}
                {getNumberInput("Splitter Width (px)", splitterWidthPx, setSplitterWidthPx)}
                {getFontSizeSelector(fontSize, setFontSize)}
            </ConfigurationPane>
            <FontSizeColorTestingWrapper fontSize={fontSize}>
                <div style={{height: `${testAreaHeightPx}px`}}>
                    <SplitterView direction="vertical" splitterSizePx={splitterWidthPx} defaultFirstPaneSize="150px">
                        <ScrollView>
                            <div className="w3-khaki" style={{width:"300px", height:"2000px"}}>
                                First Pane
                            </div>
                        </ScrollView>
                        <SplitterView direction="horizontal" defaultFirstPaneSize="75%" splitterSizePx={splitterWidthPx}>
                            <ScrollView>
                                <div className="w3-pale-green" style={{height:"1500px", width:"1300px"}}>
                                    Second Pane
                                </div>
                            </ScrollView>
                            <NoOverflowContainer>
                                {getTestTable()}
                            </NoOverflowContainer>
                        </SplitterView>
                    </SplitterView>
                </div>
            </FontSizeColorTestingWrapper>
        </TestingPane>
    );
}