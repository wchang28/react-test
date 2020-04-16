import * as React from 'react';

const DEFAULT_CAPTION = "Information";
const DEFAULT_CLOSE_TEXT = "OK";

export interface Props {
    caption?: string;
    closeText?: string;
    hint?: any;
    widthPx?: number;
    onClose: (hint?: any) => void;
}

export interface State {
    caption?: string;
    closeText?: string;
    hint?: any;
    widthPx?: number;
}

export class InformationModal extends React.Component<Props, State> {
    private _documentKeyUpListner: (event: KeyboardEvent) => void
    private get DocumentKeyUpListner() {
        return ((event: KeyboardEvent) => {
            if (event.key === "Enter" || event.key === "Escape") {
                this.onClose();
            }
        }).bind(this);
    }
    constructor(props) {
        super(props);
        this._documentKeyUpListner = this.DocumentKeyUpListner;
        this.state = {
            caption: (this.props.caption ? this.props.caption : DEFAULT_CAPTION)
            ,closeText: (this.props.closeText ? this.props.closeText : DEFAULT_CLOSE_TEXT)
            ,hint: (this.props.hint ? this.props.hint : null)
            ,widthPx: (typeof this.props.widthPx === "number" ? this.props.widthPx : null)
        };
    }
    static getDerivedStateFromProps(props: Props, state: State) {
        return {
            caption: (props.caption ? props.caption : DEFAULT_CAPTION)
            ,closeText: (props.closeText ? props.closeText: DEFAULT_CLOSE_TEXT)
            ,hint: (props.hint ? props.hint : null)
            ,widthPx: (typeof props.widthPx === "number" ? props.widthPx : null)
        };
    }
    onClose() {
        if (typeof this.props.onClose === "function") {
            this.props.onClose(this.state.hint);
        }
    }
    render() {
        return (
            <div className="w3-modal" style={{display:"block"}}>
                <div className="w3-modal-content w3-card-4" style={typeof this.state.widthPx === "number" ? {width: `${this.state.widthPx}px`} : null}>
                    <div className="w3-container" style={{padding: "4px"}}>
                        <div className="w3-bar w3-blue">
                            <div className="w3-bar-item" style={{padding: "2px"}}>{this.state.caption}</div>
                            <div className="w3-bar-item w3-right" style={{padding: "0px", marginRight: "2px"}}>
                                <button className="w3-button w3-small" style={{padding: "0px 6px"}} onClick={() => this.onClose()}>x</button>
                            </div>
                        </div>
                        <div className="w3-container" style={{marginTop: "4px", padding: "0px"}}>
                            {this.props.children}
                        </div>
                        <footer className="w3-bar" style={{marginTop: "4px"}}>
                            <div className="w3-bar-item w3-right" style={{padding: "0px"}}>
                                <div className="w3-bar">
                                    <div className="w3-bar-item" style={{padding: "4px"}}>
                                        <button className="w3-button w3-border w3-round" style={{padding:"2px 4px"}} onClick={() => this.onClose()}>{this.state.closeText}</button>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        document.addEventListener("keyup", this._documentKeyUpListner);
    }
    componentWillUnmount() {
        document.removeEventListener("keyup", this._documentKeyUpListner);
    }
}