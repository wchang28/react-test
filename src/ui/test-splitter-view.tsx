import React, {useState} from 'react';
import {SplitterView} from "./splitter-view";
import ScrollView from "./scroll-view";
import {TestingPane, ConfigurationPane, getFontSizeSelector, FontSize, getNumberInput, FontSizeColorTestingWrapper} from "./test-common";

export default () => {
    const [testAreaHeightPx, setTestAreaHeightPx] = useState(500);
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
                            <div className="w3-khaki" style={{width:"500px", height: "2000px"}}>
                                First Pane
                            </div>
                        </ScrollView>
                        <SplitterView direction="horizontal" defaultFirstPaneSize="75%" splitterSizePx={splitterWidthPx}>
                            <div className="w3-pale-green" style={{height: "1500px", width: "1300px"}}>
                                Second Pane
                            </div>
                            <div className="w3-light-blue" style={{height: "100%", width: "100%"}}>
                                Third Pane
                            </div>
                        </SplitterView>
                    </SplitterView>
                </div>
            </FontSizeColorTestingWrapper>
        </TestingPane>
    );
}