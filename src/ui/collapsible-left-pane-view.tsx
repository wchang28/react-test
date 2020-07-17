import * as React from "react";
import {ReactNode} from "react";
import {createUseStyles} from 'react-jss';

const TOGGLE_AREA_DIMENSION = "1.5em";

const cf = {content: '""', display: "table", clear: "both"};
const clearFloat = {"&:before": cf, "&:after": cf};

const useStyles = createUseStyles({
    mainContainer: {
        ...clearFloat,
        display: "table"
        ,width: "100%"
    },
    leftContainer: {
        ...clearFloat,
        display: "table-cell",
        width: ({collapsed, leftPaneWidth}) => (collapsed ? TOGGLE_AREA_DIMENSION : leftPaneWidth)
    },
    rightContainer: {
        ...clearFloat,
        display: "table-cell"
    },
    toggleBar: {
        ...clearFloat,
        width: "100%",
        position: "relative",
        overflow: "hidden",
        height: TOGGLE_AREA_DIMENSION
    },
    toggleArea: {
        height: TOGGLE_AREA_DIMENSION,
        width: TOGGLE_AREA_DIMENSION,
        position: "absolute",
        right: "0"
    },
    toggleButton: {
        "font-size": "1.25em",
        margin: "0",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform:"translate(-50%, -50%)",
        cursor:"pointer"
    },
    leftContentContainer: {
        ...clearFloat,
        display: ({collapsed}) => (collapsed ? "none" : "block")
    }
});

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export interface Props {
    collapsed?: boolean;
    leftPaneWidth?: string;
    collapseButtonTitle?: (collapsed: boolean) => string;
    onCollapseChanged: (collapsed: boolean) => void;
}

export default function CollapsibleLeftPaneView(props: ReactProps<Props>) {
    const {children, collapsed, leftPaneWidth, collapseButtonTitle, onCollapseChanged} = props;
    const leftPaneContent = children[0];
    const rightPaneContent = children[1];
    const classes = useStyles({collapsed, leftPaneWidth});
    const toggleButton = <i className={`fa fa-${collapsed ? "arrow-circle-o-right" : "arrow-circle-o-left"} ${classes.toggleButton}`} title={collapseButtonTitle(collapsed)} onClick={() => {onCollapseChanged(!collapsed);}}></i>;
    const toggleBar = <div className={classes.toggleBar}><div className={classes.toggleArea}>{toggleButton}</div></div>;
    return (
        <div className={classes.mainContainer}>
            <div className={classes.leftContainer}>
                {toggleBar}
                <div className={classes.leftContentContainer}>{leftPaneContent}</div>
            </div>
            <div className={classes.rightContainer}>
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