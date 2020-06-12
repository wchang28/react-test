
import * as React from "react";

const DEFAULT_LEDT_PANEL_WIDTH_PX = 300;

export interface Props {
    collapsed?: boolean;
    leftPaneWidthPx?: number;
    onCollapseChanged: (collapsed: boolean) => void;
}

export default (props: Props) => {
    const collapsed = (typeof props.collapsed === "boolean" ? props.collapsed : false);
    const leftPaneWidthPx = (typeof props.leftPaneWidthPx === "number" && props.leftPaneWidthPx >= 0 ? props.leftPaneWidthPx : DEFAULT_LEDT_PANEL_WIDTH_PX);
    const debugObj = {collapsed, leftPaneWidthPx};
    const debugButton = <button className="w3-bar-item w3-botton w3-border w3-round" onClick={() => {props.onCollapseChanged(!collapsed);}}>Toggle Me {`(${JSON.stringify(debugObj)})`}</button>
    return (
        <div className="w3-bar">
            {debugButton}
        </div>
    )
}