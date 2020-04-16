import * as React from 'react';
import {InformationModal} from "./information-modal";

interface State {
    showModel: boolean;
}

export class Test extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            showModel: false
        }
    }
    onShowModal() {
        this.setState({showModel: true});
    }
    get OnModalCloseHandler() {
        return ((hint?: string)=> {
            this.setState({showModel: false});
            console.log(`hint=${hint}`);
        }).bind(this);
    }
    render() {
        const modal = (this.state.showModel ? 
            <InformationModal
                caption="This is some info"
                closeText="Close"
                onClose={this.OnModalCloseHandler}
                hint="{some id}"
                widthPx={300}
            >
                <div>
                    Howdy
                </div>
            </InformationModal>
            : null);
        return (
            <div>
                <div className="w3-container" style={{padding: "8px 0px"}}>
                    <button className="w3-button w3-border w3-round" onClick={() => this.onShowModal()}>Show Modal</button>
                </div>
                {modal}
            </div>
        );
    }
}