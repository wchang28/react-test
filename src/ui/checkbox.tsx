import * as React from "react";
import {ReactNode, KeyboardEvent} from "react";

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

function getCheckboxUI(value?: boolean | null) {
    return {
        unicodeChar: (value ? '\u2611' : '\u2610')
        ,fontSize: "1.5em"
    };
}

export interface Props {
    checked?: boolean | null;
    onChange: (checked: boolean) => void;
}

export default (props: ReactProps<Props>) => {
    const {unicodeChar, fontSize} = getCheckboxUI(props.checked);
    const onChange = () => {
        props.onChange(props.checked ? false: true);
    };
    const handleKeyPress = (event: KeyboardEvent<HTMLSpanElement>) => {
        if(event.key === 'Space') {
            onChange();
        }
    };
    return (
        <span tabIndex={0} onClick={onChange} onKeyPress={handleKeyPress} style={{fontSize, cursor: "pointer"}}>{unicodeChar}</span>
    );
}