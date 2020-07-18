import React, {useState} from "react";
import {FontSize, getFontSizeSelector, getNumberInput, getCheckbox, TestingPane, ConfigurationPane, FontSizeColorTestingWrapper, getTestDiv, getTestTable} from "./test-common";
import CollapsibleLeftPaneView from "./collapsible-left-pane-view";
import ScrollView from "./scroll-view";

export default () => {
    const [collapsed, setCollapsed] = useState(false);
    const [leftPaneWidthPx, setLeftPaneWidthPx] = useState(200);
    const [fontSize, setFontSize] = useState<FontSize>("small");
    const [allowLeftPaneScrolling, setAllowLeftPaneScrolling] = useState(true);
    const testDiv = getTestDiv("khaki");
    const leftPaneContent = (allowLeftPaneScrolling ? <ScrollView height="120px">{testDiv}</ScrollView> : testDiv);
    const rightPaneContent = <div className="w3-clear">{getTestTable()}</div>;
    return (
        <TestingPane>
            <ConfigurationPane>
                {getCheckbox("Collapsed", collapsed, setCollapsed)}
                {getNumberInput("Left Pane Width px:", leftPaneWidthPx, setLeftPaneWidthPx)}
                {getFontSizeSelector(fontSize, setFontSize)}
                {getCheckbox("Allow Left Pane Scrolling", allowLeftPaneScrolling, setAllowLeftPaneScrolling)}
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