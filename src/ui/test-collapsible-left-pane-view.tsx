import React, {useState} from "react";
import {FontSize, getFontSizeSelector, getNumberInput, getCheckbox, TestingPane, FontSizeColorTestingWrapper} from "./test-common";
import CollapsibleLeftPaneView, {CLASS_PREFIX as CTRL_CLASS_PREFIX} from "./collapsible-left-pane-view";
import {uuid, injectCSS} from "./utils";

const leftPaneContent = (
    <div className="left-content">
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
    <div className="right-content w3-container">
        Hawdy, World!<br/>
        Hawdy, World!<br/>
        Hawdy, World!<br/>
        Hawdy, World!<br/>
        Hawdy, World!<br/>
    </div>
);

const this_class = `test-collapsible-left-pane-view-${uuid()}`;

injectCSS(`
.${this_class} .${CTRL_CLASS_PREFIX}-left-pane-top-bar {
    color:#000!important;
    background-color:#9e9e9e!important
}
.${this_class} .${CTRL_CLASS_PREFIX}-toggle-area {
    color:#000!important;
    background-color:#9e9e9e!important
}
`);

export default () => {
    const [collapsed, setCollapsed] = useState(false);
    const [leftPaneWidthPx, setLeftPaneWidthPx] = useState(200);
    const [fontSize, setFontSize] = useState<FontSize>("medium");
    return (
        <TestingPane className={this_class}>
            <div>
                {getCheckbox("Collapsed", collapsed, setCollapsed)}
                {getNumberInput("Left Pane Width px:", leftPaneWidthPx, setLeftPaneWidthPx)}
                {getFontSizeSelector(fontSize, setFontSize)}
            </div>
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