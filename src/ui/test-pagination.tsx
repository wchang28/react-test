import * as React from 'react';
import {Pagination} from "./pagination";

interface State {
    totalPages?: number;
    pageIndex?: number;
    data?: any[];
}

export class Test extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
            totalPages: 53
            ,pageIndex: 0
            ,data: []
		};
    }
    getOnPageChangeHandler() {
        return (async (pageIndex: number) => {
            this.setState({pageIndex});
        }).bind(this);
    }
    render() {
        return (
            <div>
                <div className="w3-container">
                    <p><b>Pagination Test</b></p>
                    <div className="w3-container">
                        <Pagination mode="both" viewLength={10} totalPages={this.state.totalPages} pageIndex={this.state.pageIndex} onPageChange={this.getOnPageChangeHandler()}>
                            <div className="w3-container">
                                Showing content for page {this.state.pageIndex+1}
                            </div>
                        </Pagination>
                    </div>
                </div>
            </div>
        );
    }
}