
import * as React from "react";
import {ReactNode} from "react";

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

const DEFAULT_LEDT_PANEL_WIDTH_PX = 300;
const TOGGLE_AREA_DIM_PX = 24;

export interface Props {
    collapsed?: boolean;
    leftPaneWidthPx?: number;
    onCollapseChanged: (collapsed: boolean) => void;
}

const getToggleArea = (collapsed: boolean, onToggleClicked: () => void) => {
    const icon = (collapsed ? "arrow-circle-o-right" : "arrow-circle-o-left");
    const title = (collapsed ? "Expand to the right" : "Collapse to the left")
    return (
        <div className="clpv-toggle-area" style={{float:"right", height: `${TOGGLE_AREA_DIM_PX}px`, width: `${TOGGLE_AREA_DIM_PX}px`, position: "relative"}}>
            <i className={`clpv-toggle-button fa fa-${icon}`} title={title} style={{fontSize:"1.25em", margin:0, position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", cursor:"pointer"}} onClick={onToggleClicked}></i>
        </div>
    );
};

const getLeftContainer = (collapsed: boolean, content: JSX.Element) => {
    const float = (collapsed ? "left" : undefined);
    const width = (collapsed ? "0" : undefined);
    return (
        <div className="clpv-left-content-container" style={{float, width, display: "block", overflow:"auto", whiteSpace: "nowrap"}}>
            {content}
        </div>
    );
}

const getLeftView = (collapsed: boolean, onToggleClicked: () => void, content: JSX.Element) => {
    if (collapsed) {
        return (
            <div className="clpv-view-collpase w3-bar">
                {getLeftContainer(collapsed, content)}
                {getToggleArea(collapsed, onToggleClicked)}
            </div>
        );
    } else {
        return (
            <div className="clpv-view-no-collpase">
                <div className="clpv-left-pane-top-bar w3-bar">
                    {getToggleArea(collapsed, onToggleClicked)}
                </div>
                {getLeftContainer(collapsed, content)}
            </div>
        );
    }
}

export default (props: ReactProps<Props>) => {
    const collapsed = (typeof props.collapsed === "boolean" ? props.collapsed : false);
    const leftPaneWidthPx = (typeof props.leftPaneWidthPx === "number" && props.leftPaneWidthPx >= 0 ? props.leftPaneWidthPx : DEFAULT_LEDT_PANEL_WIDTH_PX);
    const onToggleClicked = () => {props.onCollapseChanged(!collapsed);};
    const leftWidth = (collapsed ? TOGGLE_AREA_DIM_PX : leftPaneWidthPx);
    const leftPaneContent = props.children[0];
    const rightPaneContent = props.children[1];
    //const debugObj = {collapsed, leftPaneWidthPx};
    //const debugButton = <button className="w3-bar-item w3-botton w3-border w3-round" onClick={onToggleClicked}>Toggle Me {`(${JSON.stringify(debugObj)})`}</button>
    return (
        <div className="clpv-main w3-bar">
            <div className="clpv-left" style={{float:"left", width:`${leftWidth}px`}}>
                {getLeftView(collapsed, onToggleClicked, leftPaneContent)}
            </div>
            <div className="clpv-right" style={{marginLeft:`${leftWidth}px`}}>
                <div className="clpv-right-content-container">
                    {rightPaneContent}
                </div>
            </div>
        </div>
    )
}