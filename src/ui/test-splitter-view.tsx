import React, {useState} from 'react';
import {SplitterView} from "./splitter-view";
import {TestingPane, ConfigurationPane, getFontSizeSelector, FontSize, getNumberInput, FontSizeColorTestingWrapper} from "./test-common";

export default () => {
    const [splitterWidthPx, setSplitterWidthPx] = useState(5);
    const [fontSize, setFontSize] = useState<FontSize>("small");
    return (
        <TestingPane>
            <ConfigurationPane>
                {getNumberInput("Splitter Width (px)", splitterWidthPx, setSplitterWidthPx)}
                {getFontSizeSelector(fontSize, setFontSize)}
            </ConfigurationPane>
            <FontSizeColorTestingWrapper fontSize={fontSize}>
                <div style={{padding: "0px", marginTop: "8px", marginBottom: "8px", height: "600px"}}>
                    <SplitterView direction="vertical" splitterSizePx={splitterWidthPx} defaultFirstPaneSize="150px">
                        <div className="w3-khaki" style={{height: "2000px", width: "100%"}}>
                            First Pane
                        </div>
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