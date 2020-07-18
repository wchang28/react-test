import * as React from "react";
import {ReactNode, useEffect, useState, useRef} from "react";
import {createUseStyles} from 'react-jss';

const TOGGLE_AREA_DIMENSION = "1.5em";

const cf = {content: '""', display: "table", clear: "both"};
const clearFloat = {"&:before": cf, "&:after": cf};

const useStyles = createUseStyles({
    mainContainer: {
        ...clearFloat,
        position: "relative",
        width: "100%",
        height: ({mainContainerHeightPx}) => `${mainContainerHeightPx}px`
    },
    leftContainer: {
        ...clearFloat,
        position: "absolute",
        width: ({collapsed, leftPaneWidth}) => (collapsed ? TOGGLE_AREA_DIMENSION : leftPaneWidth)
    },
    rightContainer: {
        ...clearFloat,
        position: "absolute",
        left: ({collapsed, leftPaneWidth}) => (collapsed ? TOGGLE_AREA_DIMENSION : leftPaneWidth),
        right:0
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
    const [mainContainerHeightPx, setMainContainerHeightPx] = useState(0);
    const refLeftContainer = useRef<HTMLDivElement>();
    const refRightContainer = useRef<HTMLDivElement>();
    const [isActive] = useState(true);
    useEffect(() => {
        const handleResize = () => {
            const leftRect = refLeftContainer.current.getBoundingClientRect();
            const rightRect = refRightContainer.current.getBoundingClientRect();
            setMainContainerHeightPx(Math.max(leftRect.height, rightRect.height));
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [isActive]);
    useEffect(() => {
        const leftRect = refLeftContainer.current.getBoundingClientRect();
        const rightRect = refRightContainer.current.getBoundingClientRect();
        setMainContainerHeightPx(Math.max(leftRect.height, rightRect.height));
    });
    const classes = useStyles({collapsed, leftPaneWidth, mainContainerHeightPx});
    const toggleButton = <i className={`fa fa-${collapsed ? "arrow-circle-o-right" : "arrow-circle-o-left"} ${classes.toggleButton}`} title={collapseButtonTitle(collapsed)} onClick={() => {onCollapseChanged(!collapsed);}}></i>;
    const toggleBar = <div className={classes.toggleBar}><div className={classes.toggleArea}>{toggleButton}</div></div>;
    return (
        <div className={classes.mainContainer}>
            <div className={classes.leftContainer} ref={refLeftContainer}>
                {toggleBar}
                <div className={classes.leftContentContainer}>{leftPaneContent}</div>
            </div>
            <div className={classes.rightContainer} ref={refRightContainer}>
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