import * as React from 'react';
import * as $ from "jquery";

export class AppDisabler extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div style={{display: "none"}}></div>);
    }
    componentDidMount() {
        $("body").append('<div id="overlay" style="background-color:grey;position:absolute;top:0;left:0;height:100%;width:100%;z-index:999;opacity:0.80"></div>');
    }
    componentWillUnmount() {
        $("#overlay").remove();
    }
}