import * as React from 'react';
import {Alert} from "./alert";

interface State {
    message?: string;
}

export class Test extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            message: null
        };
    }
    render() {
        const showMessage = (this.state.message ? true : false);
        const alert = (showMessage ? 
            <div className="w3-small">
                <Alert
                    message={this.state.message}
                    importance="error"
                    strong={true}
                    onClose={() => this.setState({message: null})}
                />
            </div>
            : null)
        return (
            <div>
                <div className="w3-container w3-border" style={{padding: "8px", marginTop: "8px"}}>
                </div>
                <div className="w3-container" style={{padding: "0px", marginTop: "8px", marginBottom: "8px", height: "600px"}}>
                    <button className="w3-button w3-border" onClick={() => this.setState({message: "This is a message for the Alert box"})}>Show Alert</button>
                </div>
                {alert}
            </div>
        );
    }
}