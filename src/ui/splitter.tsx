import * as React from 'react';

export type Direction = "vertical" | "horizontal";

const DEFAULT_DIRECTION: Direction = "vertical";
const DEFAULT_FIRST_PANE_SIZE_PX: number = 200;
const DEFAULT_SPLITTER_SIZE_PX: number = 3;

export interface Props {
    direction: Direction;
    splitterSizePx?: number;
    defaultFirstPaneSizePx?: number;
}

export interface State {
    direction?: Direction;
    splitterSizePx?: number;
    firstPaneSizePx?: number;
}

export class Splitter extends React.Component<Props, State> {
    private refFirstPane: React.RefObject<HTMLDivElement>;
    private docMouseMoveListener: (event: MouseEvent) => void;
    private docMouseUpListener: (event: MouseEvent) => void;
    constructor(props) {
        super(props);
        this.refFirstPane = React.createRef<HTMLDivElement>();
        this.docMouseMoveListener = this.DocumentMouseMoveListener;
        this.docMouseUpListener = this.DocumentMouseUpListener;
        this.state = {
            direction: null
            ,splitterSizePx: null
            ,firstPaneSizePx: (typeof this.props.defaultFirstPaneSizePx === "number" && this.props.defaultFirstPaneSizePx > 0 ? this.props.defaultFirstPaneSizePx : DEFAULT_FIRST_PANE_SIZE_PX)
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
            const firstPaneDiv = this.refFirstPane.current;
            const rect = firstPaneDiv.getBoundingClientRect();
            const x = event.clientX;
            const y = event.clientY;
            const offsetX = x - rect.x;
            const offsetY = y - rect.y;
            const offset = (this.Direction === "vertical" ? offsetX : offsetY);
            const firstPaneSizePx = offset + Math.floor(this.SplitterSizePx/2);
            this.setState({firstPaneSizePx});
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
        const firstPaneSizePx = this.state.firstPaneSizePx;
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
            styleFirstPane.width = `${firstPaneSizePx}px`;
        } else {    // horizontal
            styleFirstPane.right = "0px";
            styleFirstPane.height = `${firstPaneSizePx}px`;
        }
        /////////////////////////////////////////////////////////////////////////////////////
        // styleSecondPane
        /////////////////////////////////////////////////////////////////////////////////////
        const styleSecondPane: React.CSSProperties = {
            padding: "0px"
            ,overflow: "auto"
            ,position: "absolute"
            ,bottom: "0px"
            ,right: "0px"
        };
        if (direction === "vertical") {
            styleSecondPane.top = "0px";
            styleSecondPane.left = `${firstPaneSizePx}px`;
        } else {    // horizontal
            styleSecondPane.left = "0px";
            styleSecondPane.top = `${firstPaneSizePx}px`;
        }
        /////////////////////////////////////////////////////////////////////////////////////
        // styleFirstPaneInner
        /////////////////////////////////////////////////////////////////////////////////////
        const styleFirstPaneInner: React.CSSProperties = {
            padding: "0px"
            ,overflow: "auto"
            ,position:"absolute"
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
            <div className="w3-container" style={{padding:"0px", position: "relative", width: "100%", height:"100%"}}>
                <div ref={this.refFirstPane} style={styleFirstPane}>
                    <div style={{position: "relative", width: "100%", height:"100%"}}>
                        <div className="w3-container" style={styleFirstPaneInner}>
                            {firstPaneContent}
                        </div>
                        <div style={styleDragbar} onMouseDown={this.OnDragbarMouseDownHandler}></div>
                    </div>
                </div>
                <div className="w3-container" style={styleSecondPane}>
                    {secondPaneContent}
                </div>                
            </div>
        );
    }
}