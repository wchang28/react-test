import * as React from "react";
import {ReactNode} from "react";
import {createUseStyles} from 'react-jss';

const cf = {content: '""', display: "table", clear: "both"};
const clearFloat = {"&:before": cf, "&:after": cf};

const useStyles = createUseStyles({
    toggleBar: {
        ...clearFloat,
        width: "100%",
        overflow: "hidden"
    }
});

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export interface Props {
    collapsed?: boolean;
    leftPaneWidth?: string;
    collapseButtonTitle?: (collapsed: boolean) => string;
    onCollapseChanged: (collapsed: boolean) => void;
}

const TOGGLE_AREA_DIMENSION = "1.5em";

const getToggleArea = (collapsed: boolean, onToggleClicked: () => void, collapseButtonTitle: (collapsed: boolean) => string) => {
    const dimension = TOGGLE_AREA_DIMENSION;
    const float = (collapsed ? undefined : "right");
    const icon = (collapsed ? "arrow-circle-o-right" : "arrow-circle-o-left");
    const title = collapseButtonTitle(collapsed);
    return (
        <div style={{float:float, height: `${dimension}`, width: `${dimension}`, position: "relative"}}>
            <i className={`fa fa-${icon}`} title={title} style={{fontSize:"1.25em", margin:0, position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", cursor:"pointer"}} onClick={onToggleClicked}></i>
        </div>
    );
};

export default function CollapsibleLeftPaneView(props: ReactProps<Props>) {
    const {children, collapsed, leftPaneWidth, collapseButtonTitle, onCollapseChanged} = props;
    const leftWidth = (collapsed ? TOGGLE_AREA_DIMENSION : leftPaneWidth);
    const onToggleClicked = () => {onCollapseChanged(!collapsed);};
    const leftPaneContent = children[0];
    const rightPaneContent = children[1];
    const classes = useStyles();
    const toggleArea = getToggleArea(collapsed, onToggleClicked, collapseButtonTitle);
    const toggleBar = (<div className={classes.toggleBar}>{toggleArea}</div>);
    return (
        <div style={{display:"table", width:"100%"}}>
            <div style={{display:"table-cell", width: leftWidth}}>
                {toggleBar}
                {collapsed ? null : leftPaneContent}
            </div>
            <div style={{display:"table-cell"}}>
                {rightPaneContent}
            </div>
        </div>
    );
}

CollapsibleLeftPaneView.defaultProps = {
    collapsed: false
    ,leftPaneWidth: "300px"
    ,collapseButtonTitle: (collapsed: boolean) => (collapsed ? "Expand to the right" : "Collapse to the left")
    ,onCollapseChanged: () => {}
} as Props;