import * as React from 'react';
import {YesNoConfirm} from "./yes-no-confirm";

interface State {
    showConfirm: boolean;
}

export class Test extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false
        };
    }
    onShowConfirm() {
        this.setState({showConfirm: true});
    }
    get OnConfirmCloseHandler() {
        return ((confirm: boolean)=> {
            this.setState({showConfirm: false});
            alert(`${confirm ? "Yes" : "No"} was selected`);
        }).bind(this);
    }
    render() {
        const modal = (this.state.showConfirm ? 
            <div className="w3-tiny">
                <YesNoConfirm
                    caption={"Save ?"}
                    captionColor="teal"
                    message={"Are you sure you want to save the file?\nIt is OK to say Yes.\nit is also OK to say No."}
                    onClose={this.OnConfirmCloseHandler}
                    widthPx={300}
                >
                </YesNoConfirm>
            </div>
            : null);
        return (
            <div>
                <div className="w3-container" style={{padding: "8px 0px"}}>
                    <button className="w3-button w3-border w3-round" onClick={() => this.onShowConfirm()}>Show Confirm</button>
                </div>
                {modal}
            </div>
        );
    }
}