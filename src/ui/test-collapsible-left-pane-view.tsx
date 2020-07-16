import React, {useState} from "react";
import {FontSize, getFontSizeSelector, getNumberInput, getCheckbox, TestingPane, ConfigurationPane, FontSizeColorTestingWrapper} from "./test-common";
import CollapsibleLeftPaneView from "./collapsible-left-pane-view";

const leftPaneContent = (
    <div className="w3-container left-content w3-khaki">
        Hello,---------World!<br/>
        Hello,---------World!<br/>
        Hello,---------World!<br/>
        Hello,---------World!<br/>
        Hello,---------World!<br/>
        Hello,---------World!<br/>
        Hello,---------World!<br/>
        Hello,---------World!<br/>
    </div>
);
    
const rightPaneContent = (
    <div className="w3-container right-content w3-light-green">
        Hawdy, World!<br/>
        Hawdy, World!<br/>
        Hawdy, World!<br/>
        Hawdy, World!<br/>
        Hawdy, World!<br/>
    </div>
);

export default () => {
    const [collapsed, setCollapsed] = useState(false);
    const [leftPaneWidthPx, setLeftPaneWidthPx] = useState(200);
    const [fontSize, setFontSize] = useState<FontSize>("small");
    return (
        <TestingPane>
            <ConfigurationPane>
                {getCheckbox("Collapsed", collapsed, setCollapsed)}
                {getNumberInput("Left Pane Width px:", leftPaneWidthPx, setLeftPaneWidthPx)}
                {getFontSizeSelector(fontSize, setFontSize)}
            </ConfigurationPane>
            <FontSizeColorTestingWrapper fontSize={fontSize}>
                <CollapsibleLeftPaneView
                    collapsed={collapsed}
                    leftPaneWidth={`${leftPaneWidthPx}px`}
                    onCollapseChanged={setCollapsed}
                    collapseButtonTitle={(collapsed) => (collapsed ? "Expand" : "Collapse")}
                >
                    {leftPaneContent}
                    {rightPaneContent}
                </CollapsibleLeftPaneView>
            </FontSizeColorTestingWrapper>
        </TestingPane>
    );
}