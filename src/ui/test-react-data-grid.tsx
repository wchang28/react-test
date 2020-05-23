import * as React from 'react';
import ReactDataGrid from "./react-data-grid";

const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' },
    { key: 'count', name: 'Count' }
];
  
const rows = [
    {id: 0, title: 'row1', count: 20}
    ,{id: 1, title: 'row1', count: 40}
    ,{id: 2, title: 'row1', count: 60}
];
  
export class Test extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div>
                <ReactDataGrid
                    columns={columns}
                    rows={rows}
                />
            </div>
        );
    }
}