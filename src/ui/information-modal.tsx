import * as React from 'react';

const DEFAULT_CAPTION = "Information";
const DEFAULT_CLOSE_TEXT = "OK";

export interface Props {
    caption?: string;
    closeText?: string;
    hint?: any;
    onClose: (hint?: any) => void;
}

export interface State {
    caption?: string;
    closeText?: string;
    hint?: any;
}

export class InformationModal extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            caption: (this.props.caption ? this.props.caption : DEFAULT_CAPTION)
            ,closeText: (this.props.closeText ? this.props.closeText : DEFAULT_CLOSE_TEXT)
            ,hint: (this.props.hint ? this.props.hint : null)
        };
    }
    static getDerivedStateFromProps(props: Props, state: State) {
        return {
            caption: (props.caption ? props.caption : DEFAULT_CAPTION)
            ,closeText: (props.closeText ? props.closeText: DEFAULT_CLOSE_TEXT)
            ,hint: (props.hint ? props.hint : null)
        };
    }
    onClose() {
        if (typeof this.props.onClose === "function") {
            this.props.onClose(this.state.hint);
        }
    }
    render() {
        return (
            <div className="w3-modal">
                <div className="w3-modal-content">
                    <div className="w3-container" style={{padding: "4px"}}>
                        <div className="w3-bar w3-blue">
                            <div className="w3-bar-item" style={{padding: "2px"}}>{this.state.caption}</div>
                            <div className="w3-bar-item w3-right" style={{padding: "0px"}}>
                                <button className="w3-button" onClick={() => this.onClose()}>X</button>
                            </div>
                        </div>
                        <div className="w3-container w3-yellow" style={{marginTop: "4px", padding: "0px"}}>
                            {this.props.children}
                        </div>
                        <footer className="w3-bar w3-pink" style={{marginTop: "4px"}}>
                            <div className="w3-bar-item w3-right" style={{padding: "0px"}}>
                                <div className="w3-bar">
                                    <div className="w3-bar-item" style={{padding: "0px"}}>
                                        <button className="w3-button w3-border" onClick={() => this.onClose()}>{this.state.closeText}</button>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}