import * as React from "react";
import {ReactNode, useEffect, useState, useRef} from "react";
import {createUseStyles} from 'react-jss';

const cf = {content: '""', display: "table", clear: "both"};
const clearFloat = {"&:before": cf, "&:after": cf};

const useStyles = createUseStyles({
    sidebarViewMainContainer: {
        ...clearFloat,
        position: "relative",
        width: "100%",
        height: ({mainContainerHeightPx}) => `${mainContainerHeightPx}px`
    },
    sidebarContainer: {
        ...clearFloat,
        position: "absolute",
        width: ({sidebarWidth}) => sidebarWidth
    },
    sidebarViewContentContainer: {
        ...clearFloat,
        position: "absolute",
        left: ({sidebarWidth}) => sidebarWidth,
        right:0
    }
});

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export interface Props {
    sidebarWidth?: string;
}

export default function SidebarView(props: ReactProps<Props>) {
    const {children, sidebarWidth} = props;
    const sidebarContent = children[0];
    const content = children[1];
    const [mainContainerHeightPx, setMainContainerHeightPx] = useState(0);
    const refSidebarContainer = useRef<HTMLDivElement>();
    const refContentContainer = useRef<HTMLDivElement>();
    const [isActive] = useState(true);
    useEffect(() => {
        const handleResize = () => {
            const leftRect = refSidebarContainer.current.getBoundingClientRect();
            const rightRect = refContentContainer.current.getBoundingClientRect();
            setMainContainerHeightPx(Math.max(leftRect.height, rightRect.height));
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [isActive]);
    useEffect(() => {
        const leftRect = refSidebarContainer.current.getBoundingClientRect();
        const rightRect = refContentContainer.current.getBoundingClientRect();
        setMainContainerHeightPx(Math.max(leftRect.height, rightRect.height));
    });
    const classes = useStyles({sidebarWidth, mainContainerHeightPx});
    return (
        <div className={classes.sidebarViewMainContainer}>
            <div className={classes.sidebarContainer} ref={refSidebarContainer}>
                {sidebarContent}
            </div>
            <div className={classes.sidebarViewContentContainer} ref={refContentContainer}>
                {content}
            </div>
        </div>
    );
}

SidebarView.defaultProps = {
    sidebarWidth: "300px"
} as Props;