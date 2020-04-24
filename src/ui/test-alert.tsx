import * as React from 'react';
import {Alert, Importance, HorzontalLocation, VerticalLocation} from "./alert";

const allImportances: Importance[] = ["error" , "success" , "warning" , "info"];
const allHorizontalLocations: HorzontalLocation[] = ["left" , "center" , "right"];
const allVerticalLocations: VerticalLocation[] = ["top" , "middle" , "bottom"];

interface State {
    message?: string;
    importance?: Importance;
    strong?: boolean;
    horizontalLocation?: HorzontalLocation;
    verticalLocation?: VerticalLocation;
}

export class Test extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            message: null
            ,importance: "info"
            ,strong: true
            ,horizontalLocation: "center"
            ,verticalLocation: "middle"
        };
    }
    get OnImportanceChangeHandler() {
        return ((event: React.ChangeEvent<HTMLSelectElement>) => {
            this.setState({importance: event.target.value as Importance});
        }).bind(this);
    }
    get OnStrongChangeHandler() {
        return ((event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({strong: event.target.checked});
        }).bind(this);
    }
    get OnHorizontalLocationChangeHandler() {
        return ((event: React.ChangeEvent<HTMLSelectElement>) => {
            this.setState({horizontalLocation: event.target.value as HorzontalLocation});
        }).bind(this);
    }
    get OnVerticalLocationChangeHandler() {
        return ((event: React.ChangeEvent<HTMLSelectElement>) => {
            this.setState({verticalLocation: event.target.value as VerticalLocation});
        }).bind(this);
    }
    render() {
        const showMessage = (this.state.message ? true : false);
        const alert = (showMessage ? 
            <div className="w3-small">
                <Alert
                    message={this.state.message}
                    importance={this.state.importance}
                    strong={this.state.strong}
                    horizontalLocation={this.state.horizontalLocation}
                    verticalLocation={this.state.verticalLocation}
                    onClose={() => this.setState({message: null})}
                />
            </div>
            : null);
        const importanceOptions = allImportances.map((item, index) => {
            return (<option key={index} value={item}>{item}</option>);
        });
        const horizontalLocationOptions = allHorizontalLocations.map((item, index) => {
            return (<option key={index} value={item}>{item}</option>);
        });
        const verticalLocationOptions = allVerticalLocations.map((item, index) => {
            return (<option key={index} value={item}>{item}</option>);
        });
        return (
            <div>
                <div className="w3-container w3-border" style={{padding: "0 8px", marginTop: "8px"}}>
                    <p>
                        <label>Importance</label>
                        <select className="w3-select w3-border" name="importance" value={this.state.importance} onChange={this.OnImportanceChangeHandler} style={{padding: "4px", width: "15%"}}>
                            {importanceOptions}
                        </select>
                    </p>
                    <p>
                        <input className="w3-check" type="checkbox" checked={this.state.strong} onChange={this.OnStrongChangeHandler}/><label>Strong</label>                        
                    </p>
                    <p>
                        <label>Horizontal Location</label>
                        <select className="w3-select w3-border" name="horizontalLocation" value={this.state.horizontalLocation} onChange={this.OnHorizontalLocationChangeHandler} style={{padding: "4px", width: "15%"}}>
                            {horizontalLocationOptions}
                        </select>
                    </p>
                    <p>
                        <label>Vertical Location</label>
                        <select className="w3-select w3-border" name="verticalLocation" value={this.state.verticalLocation} onChange={this.OnVerticalLocationChangeHandler} style={{padding: "4px", width: "15%"}}>
                            {verticalLocationOptions}
                        </select>
                    </p>
                </div>
                <div className="w3-container" style={{padding: "0px", marginTop: "8px", marginBottom: "8px", height: "600px"}}>
                    <button className="w3-button w3-border" onClick={() => this.setState({message: "This is a message for the Alert box"})}>Show Alert</button>
                </div>
                {alert}
            </div>
        );
    }
}