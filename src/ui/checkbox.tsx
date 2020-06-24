import * as React from "react";
import {ReactNode, KeyboardEvent} from "react";

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

function getCheckboxUI(value?: boolean | null) {
    return {
        unicodeChar: (value ? '\u2611' : '\u2610')
        ,fontSize: "1.5em"
        ,top: "0.125em"
    };
}

export interface Props {
    checked?: boolean | null;
    onChange: (checked: boolean) => void;
}

export default (props: ReactProps<Props>) => {
    const {unicodeChar, fontSize, top} = getCheckboxUI(props.checked);
    const onChange = () => {
        props.onChange(props.checked ? false: true);
    };
    const handleKeyPress = (event: KeyboardEvent<HTMLSpanElement>) => {
        if(event.key === ' ') {
            onChange();
            event.preventDefault();
        }
    };
    return (
        <span tabIndex={0} onClick={onChange} onKeyPress={handleKeyPress} style={{position: "relative", top, fontSize, cursor: "pointer", padding: "0", outline: "0"}}>{unicodeChar}</span>
    );
}