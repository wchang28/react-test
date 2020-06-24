import * as React from 'react';
import {ReactNode} from "react";

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

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

function getColor(strong: boolean, importance: Importance) {
    let color = (strong ? "" : "pale-");
    switch(importance) {
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

function textMessageContent(message: string) {
    message = message || "";
    const lines = message.split("\n");
    return lines.map((line, index) => (<span key={index}>{line}<br/></span>));
};

export default (props: ReactProps<Props>) => {
    const message = (props.message ? props.message : DEFAULT_MESSAGE);
    const importance = (props.importance ? props.importance : DEFAULT_IMPORTANCE);
    const strong = (typeof props.strong === "boolean" ?  props.strong : DEFAULT_STRONG);
    const color = getColor(strong, importance);
    const horizontalLocation = (props.horizontalLocation ? props.horizontalLocation : DEFAULT_HORIZONTAL_LOCATION);
    const verticalLocation = (props.verticalLocation ? props.verticalLocation : DEFAULT_VERTICAL_LOCATION);
    const styleOuterDiv: React.CSSProperties = {
        position: "fixed"
        ,zIndex: 3
        ,padding: "0"
    };
    if (verticalLocation === "top" && horizontalLocation === "left") {
        styleOuterDiv.top = "0";
        styleOuterDiv.left = "0";
    } else if (verticalLocation === "top" && horizontalLocation === "center") {
        styleOuterDiv.top = "0";
        styleOuterDiv.left = "50%";
        styleOuterDiv.transform = "translate(-50%)";
    } else if (verticalLocation === "top" && horizontalLocation === "right") {
        styleOuterDiv.top = "0";
        styleOuterDiv.right = "0";
    } else if (verticalLocation === "middle" && horizontalLocation === "left") {
        styleOuterDiv.top = "50%";
        styleOuterDiv.left = "0";
        styleOuterDiv.transform = "translate(0, -50%)";
    } else if (verticalLocation === "middle" && horizontalLocation === "center") {
        styleOuterDiv.top = "50%";
        styleOuterDiv.left = "50%";
        styleOuterDiv.transform = "translate(-50%, -50%)";
    } else if (verticalLocation === "middle" && horizontalLocation === "right") {
        styleOuterDiv.top = "50%";
        styleOuterDiv.right = "0";
        styleOuterDiv.transform = "translate(0, -50%)";
    } else if (verticalLocation === "bottom" && horizontalLocation === "left") {
        styleOuterDiv.bottom = "0";
        styleOuterDiv.left = "0";
    } else if (verticalLocation === "bottom" && horizontalLocation === "center") {
        styleOuterDiv.bottom = "0";
        styleOuterDiv.left = "50%";
        styleOuterDiv.transform = "translate(-50%)";
    } else if (verticalLocation === "bottom" && horizontalLocation === "right") {
        styleOuterDiv.bottom = "0";
        styleOuterDiv.right = "0";
    } else {
        styleOuterDiv.top = "50%";
        styleOuterDiv.left = "50%";
        styleOuterDiv.transform = "translate(-50%, -50%)";            
    }
    const animateDirection = (verticalLocation === "bottom" ? "bottom" : "top");
    return (
        <div className={`w3-container w3-border w3-${color} w3-animate-${animateDirection}`} style={styleOuterDiv}>
            <div className="w3-bar">
                <span className="w3-bar-item w3-right w3-button w3-small" style={{padding: "2px 6px"}} onClick={props.onClose}>x</span>
            </div>
            <div className="w3-container" style={{marginBottom: "16px"}}>
                {textMessageContent(message)}
            </div>
        </div>
    );
}