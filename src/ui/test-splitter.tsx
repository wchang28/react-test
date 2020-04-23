import * as React from 'react';
import {Splitter} from "./splitter";

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
                    <Splitter direction="vertical" splitterSizePx={5} firstPaneSizePx={150}>
                        <div className="w3-khaki" style={{height: "2000px", width: "500px"}}>
                            First Pane
                        </div>
                        <Splitter direction="horizontal" splitterSizePx={3} firstPaneSizePx={200}>
                            <div className="w3-pale-green" style={{height: "1500px", width: "1300px"}}>
                                Second Pane
                            </div>
                            <div className="w3-light-blue" style={{height: "100%", width: "100%"}}>
                                Third Pane
                            </div>
                        </Splitter>
                    </Splitter>
                </div>
            </div>
        );
    }
}