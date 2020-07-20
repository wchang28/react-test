import * as React from 'react';

export type Direction = "vertical" | "horizontal";

const DEFAULT_DIRECTION: Direction = "vertical";
const DEFAULT_FIRST_PANE_SIZE: number = 30;
const DEFAULT_SPLITTER_SIZE_PX: number = 3;

export interface Props {
    direction: Direction;
    splitterSizePx?: number;
    defaultFirstPaneSizePct?: number;
}

export interface State {
    direction?: Direction;
    splitterSizePx?: number;
    firstPaneSize?: string; // include splitter
}

export class SplitterView extends React.Component<Props, State> {
    private refMainContainer: React.RefObject<HTMLDivElement>;
    private refFirstPane: React.RefObject<HTMLDivElement>;
    private docMouseMoveListener: (event: MouseEvent) => void;
    private docMouseUpListener: (event: MouseEvent) => void;
    constructor(props) {
        super(props);
        this.refMainContainer = React.createRef<HTMLDivElement>();
        this.refFirstPane = React.createRef<HTMLDivElement>();
        this.docMouseMoveListener = this.DocumentMouseMoveListener;
        this.docMouseUpListener = this.DocumentMouseUpListener;
        this.state = {
            direction: null
            ,splitterSizePx: null
            ,firstPaneSize: `${(this.props.defaultFirstPaneSizePct ? this.props.defaultFirstPaneSizePct : DEFAULT_FIRST_PANE_SIZE)}%`
        };
    }
    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        const ret: State = {};
        if (nextProps.direction !== prevState.direction) {
            ret.direction = nextProps.direction;
        }
        if (nextProps.splitterSizePx != undefined && nextProps.splitterSizePx !== prevState.splitterSizePx) {
            ret.splitterSizePx = nextProps.splitterSizePx;
        }
        return (JSON.stringify(ret) === '{}' ? null : ret);
    }
    get DocumentMouseMoveListener() {
        return ((event: MouseEvent) => {
            const mainContainer = this.refMainContainer.current;
            const mainContainerRect = mainContainer.getBoundingClientRect();
            const firstPaneDiv = this.refFirstPane.current;
            const rect = firstPaneDiv.getBoundingClientRect();
            const x = event.clientX;
            const y = event.clientY;
            const offsetX = x - rect.x;
            const offsetY = y - rect.y;
            const offset = (this.Direction === "vertical" ? offsetX : offsetY);
            let firstPaneSizePx = offset + Math.floor(this.SplitterSizePx/2);
            const minFirstPaneSizePx = this.SplitterSizePx;
            const maxFirstPaneSizePx = (this.Direction === "vertical" ? mainContainerRect.width : mainContainerRect.height);
            firstPaneSizePx = Math.min(Math.max(firstPaneSizePx, minFirstPaneSizePx), maxFirstPaneSizePx);
            const containerSizePx = (this.Direction === "vertical" ? mainContainerRect.width : mainContainerRect.height);
            const percent = (containerSizePx ? firstPaneSizePx*100.0/containerSizePx : 0);
            this.setState({firstPaneSize: `${percent}%`});
        }).bind(this);
    }
    get DocumentMouseUpListener() {
        return ((event: MouseEvent) => {
            document.removeEventListener("mousemove", this.docMouseMoveListener);
            document.removeEventListener("mouseup", this.docMouseUpListener);
        }).bind(this);
    }
    get OnDragbarMouseDownHandler() {
        return ((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.preventDefault();
            document.addEventListener("mousemove", this.docMouseMoveListener);
            document.addEventListener("mouseup", this.docMouseUpListener);
        }).bind(this);
    }
    get Direction() {
        return (this.state.direction ? this.state.direction : DEFAULT_DIRECTION);
    }
    get SplitterSizePx() {
        return (typeof this.state.splitterSizePx === "number" && this.state.splitterSizePx > 0 ? this.state.splitterSizePx : DEFAULT_SPLITTER_SIZE_PX);
    }
    render() {
        const firstPaneSize = this.state.firstPaneSize;
        const splitterSizePx = this.SplitterSizePx;
        const direction = this.Direction;
        // styleFirstPane
        /////////////////////////////////////////////////////////////////////////////////////
        const styleFirstPane: React.CSSProperties = {
            position: "absolute"
            ,left: "0px"
            ,top: "0px"
        };
        if (direction === "vertical") {
            styleFirstPane.bottom = "0px";
            styleFirstPane.width = firstPaneSize;
        } else {    // horizontal
            styleFirstPane.right = "0px";
            styleFirstPane.height = firstPaneSize;
        }
        /////////////////////////////////////////////////////////////////////////////////////
        // styleSecondPane
        /////////////////////////////////////////////////////////////////////////////////////
        const styleSecondPane: React.CSSProperties = {
            position: "absolute"
            ,bottom: "0px"
            ,right: "0px"
        };
        if (direction === "vertical") {
            styleSecondPane.top = "0px";
            styleSecondPane.left = firstPaneSize;
        } else {    // horizontal
            styleSecondPane.left = "0px";
            styleSecondPane.top = firstPaneSize;
        }
        /////////////////////////////////////////////////////////////////////////////////////
        // styleFirstPaneInner
        /////////////////////////////////////////////////////////////////////////////////////
        const styleFirstPaneInner: React.CSSProperties = {
            position:"absolute"
            ,left:"0px"
            ,top:"0px"
        };
        if (direction === "vertical") {
            styleFirstPaneInner.bottom = "0px";
            styleFirstPaneInner.right = `${splitterSizePx}px`;
        } else {    // horizontal
            styleFirstPaneInner.right = "0px";
            styleFirstPaneInner.bottom = `${splitterSizePx}px`;
        }
        /////////////////////////////////////////////////////////////////////////////////////
        // styleDragbar
        /////////////////////////////////////////////////////////////////////////////////////
        const styleDragbar: React.CSSProperties = {
            position: "absolute"
            ,bottom: "0px"
            ,right: "0px"
            ,cursor: `${direction === "vertical" ? "col" : "row"}-resize`
        };
        if (direction === "vertical") {
            styleDragbar.top = "0px";
            styleDragbar.width = `${splitterSizePx}px`;
        } else {    // horizontal
            styleDragbar.left = "0px";
            styleDragbar.height = `${splitterSizePx}px`;
        }
        /////////////////////////////////////////////////////////////////////////////////////
        const firstPaneContent = this.props.children[0];
        const secondPaneContent = this.props.children[1];
        return (
            <div ref={this.refMainContainer} style={{position: "relative", width: "100%", height:"100%"}}>
                <div ref={this.refFirstPane} style={styleFirstPane}>
                    <div style={{position: "relative", width: "100%", height:"100%"}}>
                        <div style={styleFirstPaneInner}>
                            {firstPaneContent}
                        </div>
                        <div style={styleDragbar} onMouseDown={this.OnDragbarMouseDownHandler}></div>
                    </div>
                </div>
                <div style={styleSecondPane}>
                    {secondPaneContent}
                </div>                
            </div>
        );
    }
}