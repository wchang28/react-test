import * as React from 'react';
import {FieldErrors, ContentProps} from "./setup-dialog";

const deepCopy = (src: any) => (JSON.parse(JSON.stringify(src)));

export interface Name {
    firstName?: string;
    lastName?: string;    
}

export type TextColor = "black" | "green";

export interface Props extends ContentProps<Name> {
    textColor?: TextColor;
}

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