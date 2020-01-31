import * as React from 'react';

export interface Props {
    value?: {
        firstName?: string;
        lastName?: string;
    }
    onChange?: (value: {firstName?: string, lastName?: string}) => void;
}

export interface State {
    name?: {
        firstName?: string;
        lastName?: string;
    }
}

export class NameEntry extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                firstName: ""
                ,lastName: ""
            }
        };
    }
    static getDerivedStateFromProps(props: Props, state: State) {
        return {
            name: {
                firstName: (props.value && props.value.firstName ? props.value.firstName : "")
                ,lastName: (props.value && props.value.lastName ? props.value.lastName : "")
            }
        };
    }
    onFirstNameChanged(event: React.ChangeEvent<HTMLInputElement>) {
        if (this.props.onChange) {
            const firstName = event.target.value;
            const value = Object.assign({}, this.state.name, {firstName});
            this.props.onChange(value);
        }
    }
    onLastNameChanged(event: React.ChangeEvent<HTMLInputElement>) {
        if (this.props.onChange) {
            const lastName = event.target.value;
            const value = Object.assign({}, this.state.name, {lastName});
            this.props.onChange(value);
        }
    }
    render() {
        return (
        <div className="w3-container w3-border w3-card-4">
            <p>
                <label>First Name</label>
                <input className="w3-input" type="text" value={this.state.name.firstName} onChange={this.onFirstNameChanged.bind(this)}/>
            </p>
            <p>
                <label>Last Name</label>
                <input className="w3-input" type="text" value={this.state.name.lastName} onChange={this.onLastNameChanged.bind(this)}/>
            </p>
        </div>
        );
    }
}