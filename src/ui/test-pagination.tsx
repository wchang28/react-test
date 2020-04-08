import * as React from 'react';
import {Pagination} from "./pagination";
import * as pg from "./pagination";

const allModes: pg.Mode[] = ["both","top","bottom"];
const allFontSizes: pg.FontSize[] = ["tiny","small","medium","large","xlarge","xxlarge","xxxlarge","jumbo"];

interface State {
    totalPages?: number;
    pageIndex?: number;
    mode?: pg.Mode;
    fontSize?: pg.FontSize;
    data?: any[];
}

export class Test extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
            totalPages: 53
            ,pageIndex: 0
            ,mode: "both"
            ,fontSize: "small"
            ,data: []
		};
    }
    getOnPageChangeHandler() {
        return (async (pageIndex: number) => {
            this.setState({pageIndex});
        }).bind(this);
    }
    getOnModeChangeHandler() {
        return ((event: React.ChangeEvent<HTMLSelectElement>) => {
            this.setState({mode: event.target.value as pg.Mode});
        }).bind(this);
    }
    getOnFontSizeChangeHandler() {
        return ((event: React.ChangeEvent<HTMLSelectElement>) => {
            this.setState({fontSize: event.target.value as pg.FontSize});
        }).bind(this);
    }
    render() {
        const modeOptions = allModes.map((mode, index) => {
            return (<option key={index} value={mode}>{mode}</option>);
        });
        const fontSizeOptions = allFontSizes.map((fontSize, index) => {
            return (<option key={index} value={fontSize}>{fontSize}</option>);
        });
        return (
            <div>
                <div className="w3-container">
                    <p><b>Pagination Test</b></p>
                    <form className="w3-container w3-border w3-round w3-padding-16 w3-margin-bottom w3-small" style={{width:"33%"}}>
                        <label>Mode</label>
                        <select className="w3-select w3-border w3-round" name="mode" value={this.state.mode} onChange={this.getOnModeChangeHandler()}>
                            {modeOptions}
                        </select>
                        <label>Font Size</label>
                        <select className="w3-select w3-border w3-round" name="fontSize" value={this.state.fontSize} onChange={this.getOnFontSizeChangeHandler()}>
                            {fontSizeOptions}
                        </select>
                    </form>
                    <Pagination mode={this.state.mode} fontSize={this.state.fontSize} viewLength={10} totalPages={this.state.totalPages} pageIndex={this.state.pageIndex} onPageChange={this.getOnPageChangeHandler()}>
                        <div className="w3-container w3-border" style={{marginTop: "8px", marginBottom: "8px"}}>
                            <p>Showing content for page {this.state.pageIndex+1}</p>
                        </div>
                    </Pagination>
                </div>
            </div>
        );
    }
}