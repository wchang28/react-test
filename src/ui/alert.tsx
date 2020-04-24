import * as React from 'react';

export type Importance = "error" | "success" | "warning" | "info";
export type HorzontalLocation = "left" | "center" | "right";
export type VerticalLocation = "top" | "middle" | "bottom";

const DEFAULT_MESSAGE = "(You should provide a message to display)";
const DEFAULT_IMPORTANCE: Importance = "info";
const DEFAULT_STRONG: boolean = false;
const DEFAULT_HORIZONTAL_LOCATION: HorzontalLocation = "center";
const DEFAULT_VERTICAL_LOCATION: VerticalLocation = "middle";

export interface Props {
    message?: string;
    importance?: Importance;
    strong?: boolean;
    horizontalLocation?: HorzontalLocation;
    verticalLocation?: VerticalLocation;
    onClose: () => void;
}

export interface State {
    message?: string;
    importance?: Importance;
    strong?: boolean;
    horizontalLocation?: HorzontalLocation;
    verticalLocation?: VerticalLocation;
}

export class Alert extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            message: null
            ,importance: null
            ,strong: null
            ,horizontalLocation: null
            ,verticalLocation: null
        };
    }
    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        const ret: State = {};
        if (nextProps.message != undefined && nextProps.message !== prevState.message) {
            ret.message = nextProps.message;
        }
        if (nextProps.importance != undefined && nextProps.importance !== prevState.importance) {
            ret.importance = nextProps.importance;
        }
        if (nextProps.strong != undefined && nextProps.strong !== prevState.strong) {
            ret.strong = nextProps.strong;
        }
        if (nextProps.horizontalLocation != undefined && nextProps.horizontalLocation !== prevState.horizontalLocation) {
            ret.horizontalLocation = nextProps.horizontalLocation;
        }
        if (nextProps.verticalLocation != undefined && nextProps.verticalLocation !== prevState.verticalLocation) {
            ret.verticalLocation = nextProps.verticalLocation;
        }
        return (JSON.stringify(ret) === '{}' ? null : ret);
    }
    get Message() {
        return (this.state.message ? this.state.message : DEFAULT_MESSAGE);
    }
    get Importance() {
        return (this.state.importance ? this.state.importance : DEFAULT_IMPORTANCE);
    }
    get Strong() {
        return (typeof this.state.strong === "boolean" ? this.state.strong : DEFAULT_STRONG);
    }
    get Color() {
        let color = (this.Strong ? "" : "pale-");
        switch(this.Importance) {
            case "error":
                color += "red";
                break;
            case "success":
                color += "green";
                break;
            case "warning":
                color += "yellow";
                break;
            case "info":
            default:
                color += "blue";
        }
        return color;
    }
    get HorizontalLocation() {
        return (this.state.horizontalLocation ? this.state.horizontalLocation : DEFAULT_HORIZONTAL_LOCATION);
    }
    get VerticalLocation() {
        return (this.state.verticalLocation ? this.state.verticalLocation : DEFAULT_VERTICAL_LOCATION);
    }
    defaultTextMessageContent(message: string) {
        message = message || "";
        const lines = message.split("\n");
        const content = lines.map((line, index) => (<span key={index}>{line}<br/></span>));
        return (<div style={{paddingLeft: "4px", paddingRight: "4px"}}>{content}</div>);
    }
    render() {
        const styleOuterDiv: React.CSSProperties = {
            position: "fixed"
            ,zIndex: 3
            ,padding: "0"
        };
        if (this.VerticalLocation === "top" && this.HorizontalLocation === "left") {
            styleOuterDiv.top = "0";
            styleOuterDiv.left = "0";
        } else if (this.VerticalLocation === "top" && this.HorizontalLocation === "center") {
            styleOuterDiv.top = "0";
            styleOuterDiv.left = "50%";
            styleOuterDiv.transform = "translate(-50%)";
        } else if (this.VerticalLocation === "top" && this.HorizontalLocation === "right") {
            styleOuterDiv.top = "0";
            styleOuterDiv.right = "0";
        } else if (this.VerticalLocation === "middle" && this.HorizontalLocation === "left") {
            styleOuterDiv.top = "50%";
            styleOuterDiv.left = "0";
            styleOuterDiv.transform = "translate(0, -50%)";
        } else if (this.VerticalLocation === "middle" && this.HorizontalLocation === "center") {
            styleOuterDiv.top = "50%";
            styleOuterDiv.left = "50%";
            styleOuterDiv.transform = "translate(-50%, -50%)";
        } else if (this.VerticalLocation === "middle" && this.HorizontalLocation === "right") {
            styleOuterDiv.top = "50%";
            styleOuterDiv.right = "0";
            styleOuterDiv.transform = "translate(0, -50%)";
        } else if (this.VerticalLocation === "bottom" && this.HorizontalLocation === "left") {
            styleOuterDiv.bottom = "0";
            styleOuterDiv.left = "0";
        } else if (this.VerticalLocation === "bottom" && this.HorizontalLocation === "center") {
            styleOuterDiv.bottom = "0";
            styleOuterDiv.left = "50%";
            styleOuterDiv.transform = "translate(-50%)";
        } else if (this.VerticalLocation === "bottom" && this.HorizontalLocation === "right") {
            styleOuterDiv.bottom = "0";
            styleOuterDiv.right = "0";
        } else {
            styleOuterDiv.top = "50%";
            styleOuterDiv.left = "50%";
            styleOuterDiv.transform = "translate(-50%, -50%)";            
        }
        const animateDirection = (this.VerticalLocation === "bottom" ? "bottom" : "top");
        return (
            <div className={`w3-container w3-border w3-${this.Color} w3-animate-${animateDirection}`} style={styleOuterDiv}>
                <div className="w3-bar">
                    <span className="w3-bar-item w3-right w3-button w3-small" style={{padding: "2px 6px"}} onClick={this.props.onClose}>x</span>
                </div>
                <div className="w3-container" style={{padding: "0", marginBottom: "8px"}}>
                    {this.defaultTextMessageContent(this.Message)}
                </div>
            </div>
        );
    }
}