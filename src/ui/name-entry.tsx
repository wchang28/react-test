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
            delete newFieldErrors["first-name"];
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
            delete newFieldErrors["last-name"];
            onFieldErrorsChange(newFieldErrors);
        }
    };
    const getFieldErrorHintUI = (errorHint: string) => (errorHint ? (<span className="w3-text-red"><i className="fa fa-times"/> {errorHint}</span>) : null)
    const inputClassName = `w3-input w3-text-${textColor}`;
    return (
        <div>
            <p>
                <label>First Name</label>{' '}{getFieldErrorHintUI(fieldErrors["first-name"])}
                <input className={inputClassName} type="text" value={value.firstName} onChange={onFirstNameChange}/>
            </p>
            <p>
                <label>Last Name</label>{' '}{getFieldErrorHintUI(fieldErrors["last-name"])}
                <input className={inputClassName} type="text" value={value.lastName} onChange={onLastNameChange}/>
            </p>
        </div>
    );
}
/*
interface State {
    name?: Name;
    fieldErrors?: FieldErrors;
    textColor?: TextColor;
}

export class NameEntry extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                firstName: ""
                ,lastName: ""
            }
            ,fieldErrors: {}
            ,textColor: "black"
        };
    }
    static getDerivedStateFromProps(props: Props, state: State) {
        return {
            name: {
                firstName: (props.value && props.value.firstName ? props.value.firstName : "")
                ,lastName: (props.value && props.value.lastName ? props.value.lastName : "")
            }
            ,fieldErrors: (props.fieldErrors ? props.fieldErrors : {})
            ,textColor: (props.textColor ? props.textColor : "black")
        };
    }
    onFirstNameChanged(event: React.ChangeEvent<HTMLInputElement>) {
        if (this.props.onFieldErrorsChange) {
            const fieldErrors = deepCopy(this.state.fieldErrors);
            delete fieldErrors["first-name"];
            this.props.onFieldErrorsChange(fieldErrors);
        }
        if (this.props.onChange) {
            const firstName = event.target.value;
            const value = Object.assign({}, this.state.name, {firstName});
            this.props.onChange(value);
        }
    }
    onLastNameChanged(event: React.ChangeEvent<HTMLInputElement>) {
        if (this.props.onFieldErrorsChange) {
            const fieldErrors = deepCopy(this.state.fieldErrors);
            delete fieldErrors["last-name"];
            this.props.onFieldErrorsChange(fieldErrors);
        }
        if (this.props.onChange) {
            const lastName = event.target.value;
            const value = Object.assign({}, this.state.name, {lastName});
            this.props.onChange(value);
        }
    }
    private getFieldErrorHintUI(errorHint: string) {
        return (errorHint ? (<span className="w3-text-red"><i className="fa fa-times"/> {errorHint}</span>) : null);
    }
    render() {
        const inputClassName = `w3-input w3-text-${this.state.textColor}`;
        return (
        <div>
            <p>
                <label>First Name</label>{' '}{this.getFieldErrorHintUI(this.state.fieldErrors["first-name"])}
                <input className={inputClassName} type="text" value={this.state.name.firstName} onChange={this.onFirstNameChanged.bind(this)}/>
            </p>
            <p>
                <label>Last Name</label>{' '}{this.getFieldErrorHintUI(this.state.fieldErrors["last-name"])}
                <input className={inputClassName} type="text" value={this.state.name.lastName} onChange={this.onLastNameChanged.bind(this)}/>
            </p>
        </div>
        );
    }
}
*/