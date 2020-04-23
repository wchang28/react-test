import * as React from 'react';
import {Splitter} from "./splitter";

interface State {
    splitterWidthPx?: number;
}

export class Test extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            splitterWidthPx: 5
        };
    }
    get OnSplitterSizePxChangeHandler() {
        return ((event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({splitterWidthPx: event.target.valueAsNumber});
        }).bind(this);
    }
    render() {
        return (
            <div>
                <div className="w3-container w3-border" style={{padding: "8px", marginTop: "8px"}}>
                    <label>Splitter Width (px)</label>
                    <input className="w3-input w3-border" type="number" style={{padding:"4px", width: "20%"}} value={this.state.splitterWidthPx} onChange={this.OnSplitterSizePxChangeHandler}/>                        
                </div>
                <div className="w3-container" style={{padding: "0px", marginTop: "8px", marginBottom: "8px", height: "600px"}}>
                    <Splitter direction="vertical" splitterSizePx={this.state.splitterWidthPx} defaultFirstPaneSizePx={150}>
                        <div className="w3-khaki" style={{height: "2000px", width: "500px"}}>
                            First Pane
                        </div>
                        <Splitter direction="horizontal" defaultFirstPaneSizePx={200}>
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