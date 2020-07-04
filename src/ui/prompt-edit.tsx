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
        <div>
            {message}
            <input className={`w3-input`} type="text" value={value} onChange={onFieldChange}/>
        </div>
    );
}