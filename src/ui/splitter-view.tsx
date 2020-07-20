import * as React from 'react';
import {ReactNode, useRef} from "react";

export type Direction = "vertical" | "horizontal";

export interface Props {
    direction?: Direction;
    splitterSizePx?: number;
    dividerPosition?: number;
    onChange?: (dividerPosition: number) => void;
}

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export default function SplitterView(props: ReactProps<Props>) {
    const {direction, splitterSizePx, dividerPosition, onChange, children} = props;
    const refMainContainer = useRef<HTMLDivElement>();
    const refFirstPane = useRef<HTMLDivElement>();
    const firstPaneSize = `${dividerPosition}%`;
    // styleMainContainer
    const styleMainContainer: React.CSSProperties = {position: "relative", width: "100%", height: "100%"};
    // styleFirstPane
    ///////////////////////////////////////////////////////////////////////////////////////////////
    const styleFirstPane: React.CSSProperties = {position: "absolute", left: 0, top: 0};
    if (direction === "vertical") {
        styleFirstPane.bottom = 0;
        styleFirstPane.width = firstPaneSize;
    } else {    // horizontal
        styleFirstPane.right = 0;
        styleFirstPane.height = firstPaneSize;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // styleSecondPane
    ///////////////////////////////////////////////////////////////////////////////////////////////
    const styleSecondPane: React.CSSProperties = {position: "absolute", bottom: 0, right: 0};
    if (direction === "vertical") {
        styleSecondPane.top = 0;
        styleSecondPane.left = firstPaneSize;
    } else {    // horizontal
        styleSecondPane.left = 0;
        styleSecondPane.top = firstPaneSize;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // styleFirstPaneInner
    ///////////////////////////////////////////////////////////////////////////////////////////////
    const styleFirstPaneInner: React.CSSProperties = {position:"absolute", left: 0, top: 0};
    if (direction === "vertical") {
        styleFirstPaneInner.bottom = 0;
        styleFirstPaneInner.right = `${splitterSizePx}px`;
    } else {    // horizontal
        styleFirstPaneInner.right = 0;
        styleFirstPaneInner.bottom = `${splitterSizePx}px`;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // styleDivider
    ///////////////////////////////////////////////////////////////////////////////////////////////
    const styleDivider: React.CSSProperties = {position: "absolute", bottom: 0, right: 0, cursor: `${direction === "vertical" ? "col" : "row"}-resize`};
    if (direction === "vertical") {
        styleDivider.top = 0;
        styleDivider.width = `${splitterSizePx}px`;
    } else {    // horizontal
        styleDivider.left = 0;
        styleDivider.height = `${splitterSizePx}px`;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////
    const onDividerMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        const docMouseMoveListener = (event: MouseEvent) => {
            const mainContainerRect = refMainContainer.current.getBoundingClientRect();
            const rect = refFirstPane.current.getBoundingClientRect();
            const x = event.clientX;
            const y = event.clientY;
            const offsetX = x - rect.x;
            const offsetY = y - rect.y;
            const offset = (direction === "vertical" ? offsetX : offsetY);
            let firstPaneSizePx = offset + Math.floor(splitterSizePx/2);
            const minFirstPaneSizePx = splitterSizePx;
            const maxFirstPaneSizePx = (direction === "vertical" ? mainContainerRect.width : mainContainerRect.height);
            firstPaneSizePx = Math.min(Math.max(firstPaneSizePx, minFirstPaneSizePx), maxFirstPaneSizePx);
            const containerSizePx = (direction === "vertical" ? mainContainerRect.width : mainContainerRect.height);
            const dividerPosition = (containerSizePx ? firstPaneSizePx*100.0/containerSizePx : 0);
            onChange(dividerPosition);
        };
        const docMouseUpListener = (event: MouseEvent) => {
            event.preventDefault();
            document.removeEventListener("mousemove", docMouseMoveListener);
            document.removeEventListener("mouseup", docMouseUpListener);
        };
        document.addEventListener("mousemove", docMouseMoveListener);
        document.addEventListener("mouseup", docMouseUpListener);
    };
    const firstPaneContent = children[0];
    const secondPaneContent = children[1];
    const firstPaneInner = <div style={styleFirstPaneInner}>{firstPaneContent}</div>;
    const divider = <div style={styleDivider} onMouseDown={onDividerMouseDown}></div>;
    const firstPane = <div ref={refFirstPane} style={styleFirstPane}>{firstPaneInner}{divider}</div>;
    const secondPane = <div style={styleSecondPane}>{secondPaneContent}</div>;
    return (
        <div ref={refMainContainer} style={styleMainContainer}>
            {firstPane}
            {secondPane}
        </div>
    );
}

SplitterView.defaultProps = {
    direction: "vertical"
    ,splitterSizePx: 5
    ,dividerPosition: 20
    ,onChange: () =>{}
} as Props;