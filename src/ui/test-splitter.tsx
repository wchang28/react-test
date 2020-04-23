import * as React from 'react';
import {Splitter} from "./vertical-splitter";

export class Test extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false
        };
    }
    render() {
        return (
            <div>
                <div className="w3-container" style={{padding: "8px 0px", height: "600px"}}>
                    <Splitter direction="horizontal" splitterSizePx={5} firstPaneSizePx={100}/>
                </div>
            </div>
        );
    }
}