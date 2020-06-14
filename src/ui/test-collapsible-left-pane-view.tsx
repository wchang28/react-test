import React, {useState} from "react";
import {FontSize, getFontSizeSelector, getNumberInput, getCheckbox, TestingPane, FontSizeColorTestingWrapper} from "./test-common";
import CollapsibleLeftPaneView, {CLASS_PREFIX as CTRL_CLASS_PREFIX} from "./collapsible-left-pane-view";
import {injectCSS} from "./utils";
import shortid from "shortid";

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
    <div className="right-content">
        Hawdy, World!<br/>
        Hawdy, World!<br/>
        Hawdy, World!<br/>
        Hawdy, World!<br/>
        Hawdy, World!<br/>
    </div>
);

const this_class = `test-collapsible-left-pane-view-${shortid.generate()}`;

injectCSS(`
.${this_class} .${CTRL_CLASS_PREFIX}-toggle-area {
    color:#000!important;
    background-color:#f1f1f1!important
}
`);

export default () => {
    const [collapsed, setCollapsed] = useState(false);
    const [leftPaneWidthPx, setLeftPaneWidthPx] = useState(250);
    const [fontSize, setFontSize] = useState<FontSize>("medium");
    return (
        <TestingPane className={this_class}>
            <div>
                {getCheckbox("Collapsed", collapsed, setCollapsed)}
                {getNumberInput("Left Pane Width px:", leftPaneWidthPx, setLeftPaneWidthPx)}
                {getFontSizeSelector(fontSize, setFontSize)}
            </div>
            <FontSizeColorTestingWrapper fontSize={fontSize}>
                <CollapsibleLeftPaneView collapsed={collapsed} leftPaneWidthPx={leftPaneWidthPx} onCollapseChanged={setCollapsed}>
                    {leftPaneContent}
                    {rightPaneContent}
                </CollapsibleLeftPaneView>
            </FontSizeColorTestingWrapper>
        </TestingPane>
    );
}