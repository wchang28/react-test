import React, {useState} from "react";
import {FontSize, getFontSizeSelector, getNumberInput, getCheckbox, TestingPane, ConfigurationPane, FontSizeColorTestingWrapper, getTestTable} from "./test-common";
import CollapsibleLeftPaneView from "./collapsible-left-pane-view";

const leftPaneContent = (
    <div className="w3-clear" style={{height:"120px", overflow: "auto", whiteSpace:"nowrap"}}>
        <div className="w3-container w3-khaki">
            Hello,---------World!<br/>
            Hello,---------World!<br/>
            Hello,---------World!<br/>
            Hello,---------World!<br/>
            Hello,---------World!<br/>
            Hello,---------World!<br/>
            Hello,---------World!<br/>
            Hello,---------World!<br/>
            Hello,---------World!<br/>
            Hello,---------World!<br/>
            Hello,---------World!<br/>
            Hello,---------World!<br/>
            Hello,---------World!<br/>
            Hello,---------World!<br/>
            Hello,---------World!<br/>
            Hello,---------World!<br/>
        </div>
    </div>
);

export default () => {
    const [collapsed, setCollapsed] = useState(false);
    const [leftPaneWidthPx, setLeftPaneWidthPx] = useState(200);
    const [fontSize, setFontSize] = useState<FontSize>("small");

    const rightPaneContent = (
        <div className="w3-container">
            {getTestTable()}
        </div>
    );
    
    return (
        <TestingPane>
            <ConfigurationPane>
                {getCheckbox("Collapsed", collapsed, setCollapsed)}
                {getNumberInput("Left Pane Width px:", leftPaneWidthPx, setLeftPaneWidthPx)}
                {getFontSizeSelector(fontSize, setFontSize)}
            </ConfigurationPane>
            <FontSizeColorTestingWrapper fontSize={fontSize}>
                <div>
                    <CollapsibleLeftPaneView
                        collapsed={collapsed}
                        leftPaneWidth={`${leftPaneWidthPx}px`}
                        onCollapseChanged={setCollapsed}
                        collapseButtonTitle={(collapsed) => (collapsed ? "Expand" : "Collapse")}
                    >
                        {leftPaneContent}
                        {rightPaneContent}
                    </CollapsibleLeftPaneView>
                    <div className="w3-padding w3-dark-grey"></div>
                </div>
            </FontSizeColorTestingWrapper>
        </TestingPane>
    );
}