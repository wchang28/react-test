import * as React from 'react';
import {Confirm} from "./yes-no-confirm";

export class Test extends React.Component<any, any> {
    private confirm: Confirm;
    constructor(props) {
        super(props);
        this.confirm = new Confirm(this, "confirmBox");
        this.state = {};
    }
    get OnConfirmClickHandler() {
        return (async ()=> {
            const confirm = await this.confirm.prompt("Are you sure you want to save the file?\nIt is OK to say Yes.\nit is also OK to say No.", 300, "Confirm Save");
            alert(`${confirm ? "Yes" : "No"} was selected`);
        }).bind(this);
    }
    render() {
        return (
            <div>
                <div className="w3-container" style={{padding: "8px 0px"}}>
                    <button className="w3-button w3-border w3-round" onClick={this.OnConfirmClickHandler}>Test confirm()</button>
                </div>
                <div className="w3-small">
                    {this.confirm.element}
                </div>
            </div>
        );
    }
}