import * as React from 'react';

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

const DEFAULT_CAPTION = "Confirmation";
const DEFAULT_CAPTION_COLOR: Color = "blue";

export interface Props {
    caption?: string;
    captionColor?: Color;
    message?: string;
    widthPx?: number;
    onClose: (confirm: boolean) => void;
}

export interface State {
    caption?: string;
    captionColor?: Color;
    message?: string;
    widthPx?: number;
}

export class YesNoConfirm extends React.Component<Props, State> {
    private _documentKeyUpListner: (event: KeyboardEvent) => void
    private get DocumentKeyUpListner() {
        return ((event: KeyboardEvent) => {
            if (event.key === "Enter") {
                this.onClose(true);
            } else if (event.key === "Escape") {
                this.onClose(false);
            }
        }).bind(this);
    }
    constructor(props) {
        super(props);
        this._documentKeyUpListner = this.DocumentKeyUpListner;
        this.state = {
            caption: (this.props.caption ? this.props.caption : DEFAULT_CAPTION)
            ,captionColor: (this.props.captionColor ? this.props.captionColor : DEFAULT_CAPTION_COLOR)
            ,message: (this.props.message ? this.props.message : null)
            ,widthPx: (typeof this.props.widthPx === "number" ? this.props.widthPx : null)
        };
    }
    static getDerivedStateFromProps(props: Props, state: State) {
        return {
            caption: (props.caption ? props.caption : DEFAULT_CAPTION)
            ,captionColor: (props.captionColor ? props.captionColor : DEFAULT_CAPTION_COLOR)
            ,message: (props.message ? props.message : null)
            ,widthPx: (typeof props.widthPx === "number" ? props.widthPx : null)
        };
    }
    onClose(confirm: boolean) {
        if (typeof this.props.onClose === "function") {
            this.props.onClose(confirm);
        }
    }
    defaultTextMessageContent(message: string) {
        message = message || "";
        const lines = message.split("\n");
        const content = lines.map((line, index) => (<span key={index}>{line}<br/></span>));
        return (<div style={{paddingLeft: "4px", paddingRight: "4px"}}>{content}</div>);
    }
    render() {
        const messageContent = (this.props.children ?  this.props.children : this.defaultTextMessageContent(this.state.message));
        return (
            <div className="w3-modal" style={{display:"block"}}>
                <div className="w3-modal-content w3-card-4" style={typeof this.state.widthPx === "number" ? {width: `${this.state.widthPx}px`} : null}>
                    <div className="w3-container" style={{padding: "4px"}}>
                        <div className={`w3-bar w3-${this.state.captionColor}`}>
                            <div className="w3-bar-item" style={{padding: "2px"}}>{this.state.caption}</div>
                        </div>
                        <div className="w3-container" style={{marginTop: "4px", padding: "0px"}}>
                            {messageContent}
                        </div>
                        <footer className="w3-bar" style={{marginTop: "4px"}}>
                            <div className="w3-bar-item w3-right" style={{padding: "0px"}}>
                                <div className="w3-bar">
                                    <div className="w3-bar-item" style={{padding: "4px"}}>
                                        <button className="w3-button w3-border w3-round" style={{padding:"2px 4px"}} onClick={() => {this.onClose(true);}}>Yes</button>
                                    </div>
                                    <div className="w3-bar-item" style={{padding: "4px"}}>
                                        <button className="w3-button w3-border w3-round" style={{padding:"2px 4px"}} onClick={() => {this.onClose(false);}}>No</button>
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

export class Confirm {
    constructor (private parentComponent: React.Component, private stateField: string) {
    }
    get element() {
        const ui = this.parentComponent.state[this.stateField];
        return (ui ? ui : null) as JSX.Element;
    }
    prompt(message: string, widthPx?: number, caption?: string, captionColor?: Color) {
        return new Promise((resolve: (value: boolean) => void, reject: (err: any) => void) => {
            const confirmBox = (
                <YesNoConfirm
                    caption={caption}
                    captionColor={captionColor}
                    message={message}
                    onClose={(confirm) => {
                        this.parentComponent.setState({[this.stateField]: null})
                        resolve(confirm);
                    }}
                    widthPx={widthPx}
                />
            );
            this.parentComponent.setState({[this.stateField]: confirmBox});
        });
    }
}