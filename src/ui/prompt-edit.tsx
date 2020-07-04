import * as React from 'react';
import {ContentProps} from "./setup-dialog";

export type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: React.ReactNode }>;

export interface Props extends ContentProps<string> {
    message: string;
}

export default (props: ReactProps<Props>) => {
    const {value, onChange, message} = props;
    const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };
    const textMessageContent = (message: string) => {
        message = message || "";
        const lines = message.split("\n");
        const content = lines.map((line, index) => (<span key={index}>{line}<br/></span>));
        return (<div>{content}</div>);
    };
    return (
        <div style={{paddingTop: "0.8em"}}>
            {textMessageContent(message)}
            <input className={`w3-input`} type="text" value={value} style={{padding: "0.4em 0.4em", border: "1px solid #ccc", marginTop: "0.4em"}} onChange={onFieldChange}/>
        </div>
    );
}