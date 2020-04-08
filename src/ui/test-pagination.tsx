import * as React from 'react';
import {Pagination} from "./pagination";
import * as pg from "./pagination";

const allModes: pg.Mode[] = ["both","top","bottom"];
const allFontSizes: pg.FontSize[] = ["tiny","small","medium","large","xlarge","xxlarge","xxxlarge","jumbo"];
const allColors: pg.Color[] = [
    "amber"
    ,"aqua"
    ,"blue"
    ,"light-blue"
    ,"brown"
    ,"cyan"
    ,"blue-grey"
    ,"green"
    ,"light-green"
    ,"indigo"
    ,"khaki"
    ,"lime"
    ,"orange"
    ,"deep-orange"
    ,"pink"
    ,"purple"
    ,"deep-purple"
    ,"red"
    ,"sand"
    ,"teal"
    ,"yellow"
    ,"white"
    ,"black"
    ,"grey"
    ,"light-grey"
    ,"dark-grey"
    ,"pale-red"
    ,"pale-green"
    ,"pale-yellow"
    ,"pale-blue"
];

const PAGE_SIZE = 40;

interface DataItem {
    id: string;
    name: string;
    sex: "Male" | "Female";
}

interface State {
    totalPages?: number;
    pageIndex?: number;
    mode?: pg.Mode;
    fontSize?: pg.FontSize;
    selectedColor?: pg.Color;
    pageData?: DataItem[];
}

export class Test extends React.Component<any, State> {
	constructor(props) {
        super(props);
        const totalPages = 53;
		this.state = {
            totalPages
            ,pageIndex: 0
            ,mode: "both"
            ,fontSize: "small"
            ,selectedColor: "green"
            ,pageData: this.makeupSomeData(0, totalPages)
		};
    }
    // make up some data
    makeupSomeData(pageIndex: number, totalPages: number) {
        const ret: DataItem[] = [];
        if (totalPages > 0) {
            const onLastPage = (pageIndex === totalPages - 1);
            const n = (onLastPage ? Math.max(1, Math.floor(PAGE_SIZE/2)) : PAGE_SIZE);
            for (let i = 0; i < n; i++) {
                const ordinal = pageIndex * PAGE_SIZE + i;
                const item: DataItem = {
                    id: `${ordinal+1}`
                    ,name: `Customer ${ordinal+1}`
                    ,sex: (ordinal % 2 === 0 ? "Female" : "Male")
                };
                ret.push(item);
            }
        }
        return ret;
    }
    async getPageData(pageIndex: number) {
        return this.makeupSomeData(pageIndex, this.state.totalPages);
    }
    get OnPageChangeHandler() {
        return (async (pageIndex: number) => {
            this.setState({pageIndex});
            const pageData = await this.getPageData(pageIndex);
            this.setState({pageData});
        }).bind(this);
    }
    get OnModeChangeHandler() {
        return ((event: React.ChangeEvent<HTMLSelectElement>) => {
            this.setState({mode: event.target.value as pg.Mode});
        }).bind(this);
    }
    get OnFontSizeChangeHandler() {
        return ((event: React.ChangeEvent<HTMLSelectElement>) => {
            this.setState({fontSize: event.target.value as pg.FontSize});
        }).bind(this);
    }
    get OnSelectedColorChangeHandler() {
        return ((event: React.ChangeEvent<HTMLSelectElement>) => {
            this.setState({selectedColor: event.target.value as pg.Color});
        }).bind(this);
    }
    get OnTotalPagesChangeHandler() {
        return ((event: React.ChangeEvent<HTMLInputElement>) => {
            const totalPages = event.target.valueAsNumber;
            const pageIndex = (totalPages > 0 ? 0 : -1);
            const pageData = this.makeupSomeData(pageIndex, totalPages)
            this.setState({
                totalPages
                ,pageIndex
                ,pageData
            });
        }).bind(this);
    }
    render() {
        const modeOptions = allModes.map((mode, index) => {
            return (<option key={index} value={mode}>{mode}</option>);
        });
        const fontSizeOptions = allFontSizes.map((fontSize, index) => {
            return (<option key={index} value={fontSize}>{fontSize}</option>);
        });
        const colorOptions = allColors.map((color, index) => {
            return (<option key={index} value={color}>{color}</option>);
        });
        const dataRows = this.state.pageData.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.sex}</td>
                </tr>
            );         
        });
        return (
            <div>
                <p><b>Pagination Test</b></p>
                <form className="w3-container w3-border w3-round w3-margin-bottom w3-small" style={{width:"33%"}}>
                    <p>
                        <label>Mode</label>
                        <select className="w3-select w3-border" name="mode" value={this.state.mode} onChange={this.OnModeChangeHandler}>
                            {modeOptions}
                        </select>
                    </p>
                    <p>
                        <label>Font Size</label>
                        <select className="w3-select w3-border" name="fontSize" value={this.state.fontSize} onChange={this.OnFontSizeChangeHandler}>
                            {fontSizeOptions}
                        </select>
                    </p>
                    <p>
                        <label>Selected Color</label>
                        <select className="w3-select w3-border" name="selectedColor" value={this.state.selectedColor} onChange={this.OnSelectedColorChangeHandler}>
                            {colorOptions}
                        </select>
                    </p>
                    <p>
                        <label>Total Pages</label>
                        <input className="w3-input w3-border" name="totalPages" type="number" min="0" step="1" value={this.state.totalPages} onChange={this.OnTotalPagesChangeHandler}/>
                    </p>
                </form>
                <p>page {this.state.pageIndex+1} has {this.state.pageData.length} item(s)</p>
                <Pagination mode={this.state.mode} fontSize={this.state.fontSize} selectedColor={this.state.selectedColor} viewLength={10} totalPages={this.state.totalPages} pageIndex={this.state.pageIndex} onPageChange={this.OnPageChangeHandler}>
                    <table className="w3-table-all w3-tiny w3-card-2" style={{marginTop: "8px", marginBottom: "8px", width: "50%"}}>
                        <thead>
                            <tr className="w3-light-blue">
                                <th>#</th>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Sex</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataRows}
                        </tbody>
                    </table>
                </Pagination>
            </div>
        );
    }
}