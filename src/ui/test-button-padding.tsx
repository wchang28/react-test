import * as React from 'react';

export type FontSize = "tiny" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "xxxlarge" | "jumbo";
const allFontSizes: FontSize[] = ["tiny","small","medium","large","xlarge","xxlarge","xxxlarge","jumbo"];

interface State {
    fontSize?: FontSize;
    paddingEM?: number;
}

export class Test extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            fontSize: "medium"
            ,paddingEM: 0.2
        };
    }
    get OnFontSizeChangeHandler() {
        return ((event: React.ChangeEvent<HTMLSelectElement>) => {
            this.setState({fontSize: event.target.value as FontSize});
        }).bind(this);
    }
    get OnPaddingEMChangeHandler() {
        return ((event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({paddingEM: event.target.valueAsNumber});
        }).bind(this);
    }
    render() {
        const fontSizeOptions = allFontSizes.map((fontSize, index) => {
            return (<option key={index} value={fontSize}>{fontSize}</option>);
        });
        return (
            <div>
                <div className="w3-container w3-border" style={{padding: "0px", marginTop: "8px"}}>
                    <p>
                        <label>Font Size</label>
                        <select className="w3-select w3-border" name="fontSize" value={this.state.fontSize} onChange={this.OnFontSizeChangeHandler} style={{padding: "4px", width: "15%"}}>
                            {fontSizeOptions}
                        </select>
                    </p>
                    <p>
                        <label>Padding (em)</label>
                        <input className="w3-input w3-border" type="number" step="0.1" style={{padding:"4px", width: "15%"}} value={this.state.paddingEM} onChange={this.OnPaddingEMChangeHandler}/>                        
                    </p>
                </div>
                <div className="w3-container" style={{padding: "0px", marginTop: "8px", marginBottom: "8px", height: "600px"}}>
                    <button className={`w3-button w3-border w3-${this.state.fontSize}`} style={{padding:`${this.state.paddingEM}em ${this.state.paddingEM*2.0}em`}}>5</button>
                </div>
            </div>
        );
    }
}