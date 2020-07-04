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
    return (
        <div style={{paddingTop: "0.8em"}}>
            {message}
            <input className={`w3-input`} type="text" value={value} style={{padding: "0.4em 0.4em"}} onChange={onFieldChange}/>
        </div>
    );
}