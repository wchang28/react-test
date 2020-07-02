import * as React from 'react';
import {ContentProps} from "./setup-dialog";

export type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: React.ReactNode }>;

export interface Name {
    firstName?: string;
    lastName?: string;    
}

const fields: {field: string, label: string}[] = [
    {field: "firstName", label: "First Name"}
    ,{field: "lastName", label: "Last Name"}
];

const getFieldErrorHintUI = (errorHint: string) => (errorHint ? (<span className="w3-text-red"><i className="fa fa-times"/> {errorHint}</span>) : null);

export type TextColor = "black" | "green";

export interface Props extends ContentProps<Name> {
    textColor?: TextColor;
}

export function NameEntry(props: ReactProps<Props>) {
    const {value, onChange, fieldErrors, onFieldErrorsChange, textColor} = props;
    const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const field = (event.target.name);
        if (onChange) {
            const newFieldValue = event.target.value;
            const newValue = {...value, ...{[field]: newFieldValue}};
            onChange(newValue);
        }
        if (onFieldErrorsChange) {
            const newFieldErrors = {...fieldErrors};
            delete newFieldErrors[field];
            onFieldErrorsChange(newFieldErrors);
        }
    };
    const fieldsUI = fields.map(({field, label}, index) => {
        const fieldValue = (value && value[field] ? value[field] : "");
        return (
            <p key={index}>
                <label>{label}</label>{' '}{getFieldErrorHintUI(fieldErrors[field])}
                <input className={`w3-input w3-text-${textColor}`} type="text" value={fieldValue} name={field} onChange={onFieldChange}/>
            </p>
        );
    });
    return (<div>{fieldsUI}</div>);
}