import * as React from "react";
import {ReactNode, useState, useRef, useEffect} from "react";

export interface Props {
    height?: number | string;
    width?: number | string;
}

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export default (props: ReactProps<{}>) => {
    const refMainContainer = useRef<HTMLDivElement>();
    const getMainContainerHeight = () => {
        const viewportHeight = document.documentElement.clientHeight;
        const rect = refMainContainer.current.getBoundingClientRect();
        return Math.max(viewportHeight - rect.top -1 , 0);
    };
    const [mainContainerHeightPx, setMainContainerHeightPx] = useState(document.documentElement.clientHeight);
    const {children} = props;
    const fitMainContainer = () => {
        const height = getMainContainerHeight();
        setMainContainerHeightPx(height);        
    };
    const [isActive] = useState(true);
    useEffect(() => {
        const handleResize = () => {
            fitMainContainer();
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [isActive]);
    useEffect(() => {
        fitMainContainer();
    });
    return <div ref={refMainContainer} style={{width:`100%`, height:`${mainContainerHeightPx}px`}}>{children}</div>;
};