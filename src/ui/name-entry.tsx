import * as React from 'react';
import {ContentProps} from "./setup-dialog";

export type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: React.ReactNode }>;

export interface Name {
    firstName?: string;
    lastName?: string;    
}

export type TextColor = "black" | "green";

export interface Props extends ContentProps<Name> {
    textColor?: TextColor;
}

export function NameEntry(props: ReactProps<Props>) {
    const {value, onChange, fieldErrors, onFieldErrorsChange, textColor} = props;
    const onFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            const firstName = event.target.value;
            const newValue = {...value, firstName};
            onChange(newValue);
        }
        if (onFieldErrorsChange) {
            const newFieldErrors = {...fieldErrors};
            delete newFieldErrors["firstName"];
            onFieldErrorsChange(newFieldErrors);
        }
    };
    const onLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            const lastName = event.target.value;
            const newValue = {...value, lastName};
            onChange(newValue);
        }
        if (onFieldErrorsChange) {
            const newFieldErrors = {...fieldErrors};
            delete newFieldErrors["lastName"];
            onFieldErrorsChange(newFieldErrors);
        }
    };
    const getFieldErrorHintUI = (errorHint: string) => (errorHint ? (<span className="w3-text-red"><i className="fa fa-times"/> {errorHint}</span>) : null)
    const inputClassName = `w3-input w3-text-${textColor}`;
    return (
        <div>
            <p>
                <label>First Name</label>{' '}{getFieldErrorHintUI(fieldErrors["firstName"])}
                <input className={inputClassName} type="text" value={value.firstName} onChange={onFirstNameChange}/>
            </p>
            <p>
                <label>Last Name</label>{' '}{getFieldErrorHintUI(fieldErrors["lastName"])}
                <input className={inputClassName} type="text" value={value.lastName} onChange={onLastNameChange}/>
            </p>
        </div>
    );
}