import * as React from "react";
import {ReactNode} from "react";
import {createUseStyles} from 'react-jss';

const clearFloat = {
    content: '""',
    display: "table",
    clear: "both"  
}

const useStyles = createUseStyles({
    toggleBar: {
        width: "100%",
        overflow: "hidden",
        "&:before": clearFloat,
        "&:after": clearFloat
    }
});

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export interface Props {
    collapsed?: boolean;
    leftPaneWidth?: string;
    collapseButtonTitle?: (collapsed: boolean) => string;
    onCollapseChanged: (collapsed: boolean) => void;
}

const getToggleAreaDimension = () => "1.5em";

const getToggleArea = (collapsed: boolean, onToggleClicked: () => void, collapseButtonTitle: (collapsed: boolean) => string) => {
    const dimension = getToggleAreaDimension();
    const float = (collapsed ? undefined : "right");
    const icon = (collapsed ? "arrow-circle-o-right" : "arrow-circle-o-left");
    const title = collapseButtonTitle(collapsed);
    return (
        <div style={{float:float, height: `${dimension}`, width: `${dimension}`, position: "relative"}}>
            <i className={`fa fa-${icon}`} title={title} style={{fontSize:"1.25em", margin:0, position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", cursor:"pointer"}} onClick={onToggleClicked}></i>
        </div>
    );
};

const getLeftPane = (classes: {[styleName: string]: string}, collapsed: boolean, onToggleClicked: () => void, content: JSX.Element, collapseButtonTitle: (collapsed: boolean) => string) => {
    const toggleArea = getToggleArea(collapsed, onToggleClicked, collapseButtonTitle);
    const toggleBar = (<div className={classes.toggleBar}>{toggleArea}</div>);
    if (collapsed) {
        return toggleBar;
    } else {

        return (
            <div>
                {toggleBar}
                {content}
            </div>
        );
    }
};

export default function CollapsibleLeftPaneView(props: ReactProps<Props>) {
    const {children, collapsed, leftPaneWidth, collapseButtonTitle, onCollapseChanged} = props;
    const leftWidth = (collapsed ? getToggleAreaDimension() : leftPaneWidth);
    const onToggleClicked = () => {onCollapseChanged(!collapsed);};
    const leftPaneContent = children[0];
    const rightPaneContent = children[1];
    const classes = useStyles();
    return (
        <div style={{display:"table", width:"100%"}}>
            <div style={{display:"table-cell", width: leftWidth}}>
                {getLeftPane(classes, collapsed, onToggleClicked, leftPaneContent, collapseButtonTitle)}
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