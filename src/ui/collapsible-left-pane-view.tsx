
import * as React from "react";
import {ReactNode} from "react";

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

const DEFAULT_LEDT_PANE_WIDTH = "300px";

function getToggleAreaDimension() {
    return "1.5em";
}

export const CLASS_PREFIX = "clpv";

export interface Props {
    collapsed?: boolean;
    leftPaneWidth?: string;
    onCollapseChanged: (collapsed: boolean) => void;
}

const getToggleArea = (collapsed: boolean, onToggleClicked: () => void) => {
    const icon = (collapsed ? "arrow-circle-o-right" : "arrow-circle-o-left");
    const title = (collapsed ? "Expand to the right" : "Collapse to the left")
    return (
        <div className={`${CLASS_PREFIX}-toggle-area`} style={{float:"right", height: `${getToggleAreaDimension()}`, width: `${getToggleAreaDimension()}`, position: "relative"}}>
            <i className={`${CLASS_PREFIX}-toggle-button fa fa-${icon}`} title={title} style={{fontSize:"1.25em", margin:0, position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", cursor:"pointer"}} onClick={onToggleClicked}></i>
        </div>
    );
};

const getLeftContainer = (collapsed: boolean, content: JSX.Element) => {
    const float = (collapsed ? "left" : undefined);
    const width = (collapsed ? "0" : undefined);
    return (
        <div className={`${CLASS_PREFIX}-left-content-container`} style={{float, width, display: "block", overflow:"auto", whiteSpace: "nowrap"}}>
            {content}
        </div>
    );
}

const getLeftPane = (collapsed: boolean, onToggleClicked: () => void, content: JSX.Element) => {
    let className = `${CLASS_PREFIX}-left-pane`;
    if (collapsed) {
        className += " collpased w3-bar";
    }
    if (collapsed) {
        return (
            <div className={className}>
                {getLeftContainer(collapsed, content)}
                {getToggleArea(collapsed, onToggleClicked)}
            </div>
        );
    } else {
        return (
            <div className={className}>
                <div className={`${CLASS_PREFIX}-left-pane-top-bar w3-bar`}>
                    {getToggleArea(collapsed, onToggleClicked)}
                </div>
                {getLeftContainer(collapsed, content)}
            </div>
        );
    }
}

export default (props: ReactProps<Props>) => {
    const collapsed = (typeof props.collapsed === "boolean" ? props.collapsed : false);
    const leftPaneWidth = (props.leftPaneWidth ? props.leftPaneWidth : DEFAULT_LEDT_PANE_WIDTH);
    const onToggleClicked = () => {props.onCollapseChanged(!collapsed);};
    const leftWidth = (collapsed ? getToggleAreaDimension() : leftPaneWidth);
    const leftPaneContent = props.children[0];
    const rightPaneContent = props.children[1];
    return (
        <div className={`${CLASS_PREFIX}-main w3-bar`}>
            <div className={`${CLASS_PREFIX}-left`} style={{float: "left", width: leftWidth}}>
                {getLeftPane(collapsed, onToggleClicked, leftPaneContent)}
            </div>
            <div className={`${CLASS_PREFIX}-right`} style={{marginLeft: leftWidth}}>
                <div className={`${CLASS_PREFIX}-right-content-container`}>
                    {rightPaneContent}
                </div>
            </div>
        </div>
    );
}