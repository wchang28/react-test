import * as React from 'react';

export type Mode = "top" | "bottom" | "both";
export type FontSize = "tiny" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "xxxlarge" | "jumbo";
export type Color
= "amber"
| "aqua"
| "black"
| "blue"
| "blue-grey"
| "brown"
| "cyan"
| "dark-grey"
| "deep-orange"
| "deep-purple"
| "green"
| "grey"
| "indigo"
| "khaki"
| "light-blue"
| "light-green"
| "light-grey"
| "lime"
| "orange"
| "pale-blue"
| "pale-green"
| "pale-red"
| "pale-yellow"
| "pink"
| "purple"
| "red"
| "sand"
| "teal"
| "white"
| "yellow"
;

const DEFAULT_VIEW_LENGTH = 10;
const DEFAULT_MODE: Mode = "both";
const DEFAULT_FONT_SIZE: FontSize = "medium";
const DEFAULT_SELECTED_COLOR: Color = "green";

export interface Props {
    totalPages: number;
    pageIndex: number;
    onPageChange: (pageIndex: number) => void;
    viewLength?: number;
    mode?: Mode;
    fontSize?: FontSize;
    selectedColor?: Color;
}

interface State {
    totalPages?: number;
    pageIndex?: number;

    viewLeft?: number;

    viewLength?: number;
    mode?: Mode;
    fontSize?: FontSize;
    selectedColor?: Color;
}

export class Pagination extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            totalPages: (typeof this.props.totalPages === "number" ? this.props.totalPages : null)
            ,pageIndex: (typeof this.props.pageIndex === "number" ? this.props.pageIndex : null)
            ,viewLeft: 0
            ,viewLength: (typeof this.props.viewLength === "number" ? this.props.viewLength : DEFAULT_VIEW_LENGTH)
            ,mode: (this.props.mode ? this.props.mode : DEFAULT_MODE)
            ,fontSize: (this.props.fontSize ? this.props.fontSize : DEFAULT_FONT_SIZE)
            ,selectedColor: (this.props.selectedColor ? this.props.selectedColor: DEFAULT_SELECTED_COLOR)
        };
    }
    static ValidState(state: State) {
        if (
            typeof state.viewLength !== "number"
            || typeof state.totalPages !== "number"
            || typeof state.pageIndex !== "number"
            ) {
            return false;
        }
        if (state.viewLength < 2) {
            return false;
        }
        if (state.totalPages <= 0) {
            return false;
        }
        if (state.pageIndex >= state.totalPages) {
            return false;
        }
        return true;
    }
    static getDerivedStateFromProps(props: Props, state: State) {
        /*
        const debugState = {viewLength: state.viewLength, totalPages: state.totalPages, pageIndex: state.pageIndex, viewLeft: state.viewLeft};
        const debugProps = {viewLength: props.viewLength, totalPages: props.totalPages, pageIndex: props.pageIndex};
        console.log(`getDerivedStateFromProps()\nstate (old)=${JSON.stringify(debugState)}\nprops (new)=${JSON.stringify(debugProps)}`);
        */
        const ret: State = {
            totalPages: (typeof props.totalPages === "number" ? props.totalPages : null)
            ,pageIndex: (typeof props.pageIndex === "number" ? props.pageIndex : null)
            ,viewLength: (typeof props.viewLength === "number" ? props.viewLength : DEFAULT_VIEW_LENGTH)
            ,mode: (props.mode ? props.mode : DEFAULT_MODE)
            ,fontSize: (props.fontSize ? props.fontSize : DEFAULT_FONT_SIZE)
            ,selectedColor: (props.selectedColor ? props.selectedColor: DEFAULT_SELECTED_COLOR)
        };
        let viewLeft = 0;
        if (Pagination.ValidState(ret)) {
            if (ret.viewLength < ret.totalPages) {  // view not locked
                const viewLengthChanged = (props.viewLength !== state.viewLength);
                const totalPagesChanged = (props.totalPages !== state.totalPages);
                if (!viewLengthChanged && !totalPagesChanged) {
                    viewLeft = state.viewLeft;
                    const oldPageIndex = state.pageIndex;
                    const newPageIndex = props.pageIndex;
                    const pageChanged = (newPageIndex !== oldPageIndex);
                    if (pageChanged) {  // page changed
                        if (newPageIndex === 0) {   // first page selected
                            viewLeft = 0;
                        } else if (newPageIndex === ret.totalPages -1) {    // last page selected
                            viewLeft = ret.totalPages - ret.viewLength;
                        } else if (newPageIndex >= viewLeft && newPageIndex < viewLeft + ret.viewLength) {  // new page selected is still inside of the current view range
                            const moveUpPage = (newPageIndex > oldPageIndex);
                            const moveDownPage = (newPageIndex < oldPageIndex);
                            if (moveUpPage) {    // move up page number
                                const lastPageOfViewSelected = (newPageIndex === viewLeft + ret.viewLength - 1);
                                const canMoveView1ToTheRight = (viewLeft + ret.viewLength < ret.totalPages);
                                if (lastPageOfViewSelected && canMoveView1ToTheRight) {
                                    viewLeft++;
                                }
                            } else if (moveDownPage) {   // move down page number
                                const firstPageOfViewSelected = (newPageIndex === viewLeft);
                                const canMoveView1ToTheLeft = (viewLeft > 0);
                                if (firstPageOfViewSelected && canMoveView1ToTheLeft) {
                                    viewLeft--;
                                }
                            }
                        } else {    // new page selected is outside of the current view range
                            viewLeft = Math.min(newPageIndex, ret.totalPages - ret.viewLength);
                        }
                    }
                }
            }
        }
        ret.viewLeft = viewLeft;
        //console.log(`getDerivedStateFromProps(), state.viewLeft=${state.viewLeft}, ret=${JSON.stringify(ret)}`);
        return ret;
    }
    get ValidState() {
        return Pagination.ValidState(this.state);
    }
    get ViewLocked() {
        return (this.state.viewLength >= this.state.totalPages);
    }
    getOnPageButtonOnClikcedHandler(pageIndex: number) {
        return (() => {
            if (typeof this.props.onPageChange === "function") {
                this.props.onPageChange(pageIndex);
            }
        }).bind(this);
    }
    get PageButtonPadding() {
        const em = 0.2;
        const ratio = 2.0;
        return `${em}em ${em * ratio}em`;
    }
    get PageButtonStyle() {
        return {padding: this.PageButtonPadding};
    }
    get DotDotDotButtonStyle() {
        return {padding: this.PageButtonPadding, opacity: "1", cursor: "auto"};
    }
    getPageButtonClassName(selected: boolean) {
        return "w3-bar-item w3-button" + (selected ? ` w3-${this.state.selectedColor}`: "");
    }
    get ViewLockedBarContent() {
        const ret: JSX.Element[] = [];
        for (let pageIndex = 0; pageIndex < this.state.totalPages; pageIndex++) {
            const selected = (pageIndex === this.state.pageIndex);
            ret.push(<button key={pageIndex} className={this.getPageButtonClassName(selected)} style={this.PageButtonStyle} onClick={this.getOnPageButtonOnClikcedHandler(pageIndex)}>{pageIndex+1}</button>);
        }
        return ret;
    }
    get ViewNotLockedBarContent() {
        const ret: JSX.Element[] = [];
        const viewHitLeftBoundary = (this.state.viewLeft === 0);
        const viewHitRightBoundary = (this.state.viewLeft >= (this.state.totalPages - this.state.viewLength));
        let key = 0;
        let pageIndex = 0;
        if (!viewHitLeftBoundary) {
            ret.push(<button key={key} className={this.getPageButtonClassName(false)} style={this.PageButtonStyle} onClick={this.getOnPageButtonOnClikcedHandler(pageIndex)}>{pageIndex+1}</button>);
            key++;
            ret.push(<button key={key} className={this.getPageButtonClassName(false)} disabled={true} style={this.DotDotDotButtonStyle}>...</button>);
            key++;
        }
        for (let i = 0; i < this.state.viewLength; i++) {
            pageIndex = this.state.viewLeft + i;
            const selected = (pageIndex === this.state.pageIndex);
            ret.push(<button key={key} className={this.getPageButtonClassName(selected)} style={this.PageButtonStyle} onClick={this.getOnPageButtonOnClikcedHandler(pageIndex)}>{pageIndex+1}</button>);
            key++;
        }
        if (!viewHitRightBoundary) {
            ret.push(<button key={key} className={this.getPageButtonClassName(false)} disabled={true} style={this.DotDotDotButtonStyle}>...</button>);
            key++;
            pageIndex = this.state.totalPages-1;
            ret.push(<button key={key} className={this.getPageButtonClassName(false)} style={this.PageButtonStyle} onClick={this.getOnPageButtonOnClikcedHandler(pageIndex)}>{pageIndex+1}</button>);
            key++;
        }
        return ret;
    }
    get PaginationBar() {
        if (this.ValidState) {
            if (this.state.totalPages > 1) {
                const barContent = (this.ViewLocked ? this.ViewLockedBarContent : this.ViewNotLockedBarContent);
                const barClassName = `w3-bar w3-border w3-round w3-${this.state.fontSize}`;
                // w3-show-inline-block (display: inline-block) will add a whitespace (6px height) at the bottom of the <div>
                return (
                    <div className="w3-show-inline-block">
                        <div className={barClassName}>
                            {barContent}
                        </div>
                    </div>
                );
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    render() {
        const topBar = (this.state.mode === "top" || this.state.mode === "both" ? this.PaginationBar : null);
        const bottomBar = (this.state.mode === "bottom" || this.state.mode === "both" ? this.PaginationBar : null);
        const contentDivStyle = (topBar ? {marginTop:"-6px"} : null);   // remove the 6px height whiteapce if there is a top bar with display=inline-block
        return (
            <div>
                {topBar}
                <div style={contentDivStyle}>
                    {this.props.children}
                </div>
                {bottomBar}
            </div>
        );
    }
}