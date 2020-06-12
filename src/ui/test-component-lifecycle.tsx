import * as React from 'react';

type FontSize = "tiny" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "xxxlarge" | "jumbo";
const allFontSizes: FontSize[] = ["tiny","small","medium","large","xlarge","xxlarge","xxxlarge","jumbo"];

interface TestComponentProps {
    fontSize: FontSize;
}

interface TestComponentState {
    good: boolean;
}

const componentName = "TestComponent";

class TestComponent extends React.Component<TestComponentProps, TestComponentState> {
    constructor(props: any) {
        super(props);
        console.log(`${componentName}.ctor()`);
        this.state = {
            good: true
        }
    }
    // called after:
    //  1. .ctor()
    //  2. .setState()
    //  3. props changed
    // called before:
    //  1. render()
    static getDerivedStateFromProps(nextProps: TestComponentProps, currState: TestComponentState) {
        console.log(`${componentName}.getDerivedStateFromProps():\nnextProps=${JSON.stringify(nextProps)}\ncurrState=${JSON.stringify(currState)}`);
        return null;
    }
    _setState(st) {
        console.log(`${componentName}.setState(${JSON.stringify(st)})`);
        this.setState(st);
    }
    onToggleClick = () => {
        this._setState({good: !this.state.good});
    }
    render() {
        console.log(`${componentName}.render()`);
        const className = `w3-button w3-border w3-round w3-${this.props.fontSize}`;
        return (
            <div>
                <div>Today is a <span className={`w3-${this.state.good ? "green": "red"}`} style={{fontWeight:"bold"}}>{this.state.good ? "GOOD": "BAD"}</span> day.</div>
                <div>
                    <button className={className} onClick={this.onToggleClick}>Toggle Good/Bad</button>
                </div>
            </div>
        );
    }
    // called after mounting render()
    componentDidMount() {
        console.log(`${componentName}.componentDidMount()`);
    }
    // called everytime after the non-mounting render()
    componentDidUpdate(prevProps: TestComponentProps, prevState: TestComponentState, snapshot: any) {
        console.log(`${componentName}.componentDidUpdate():\nprevProps=${JSON.stringify(prevProps)}\nprevState=${JSON.stringify(prevState)}`);
    }
    componentWillUnmount () {
        console.log(`${componentName}.componentWillUnmount()`);
    }
}

interface State {
    fontSize: FontSize;
}

export class Test extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            fontSize: "medium"
        };
    }
    onFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({fontSize: event.target.value as FontSize});
    }
    render() {
        const fontSizeOptions = allFontSizes.map((item, index) => {
            return (<option key={index} value={item}>{item}</option>);
        });
        return (
            <div>
                <div className="w3-container w3-border" style={{padding: "0 8px", marginTop: "8px"}}>
                    <p>
                        <label>Font Size: </label>
                        <select className="w3-select w3-border" name="fontSize" value={this.state.fontSize} onChange={this.onFontSizeChange} style={{padding: "4px", width: "25%"}}>
                            {fontSizeOptions}
                        </select>
                    </p>
                </div>
                <div className="w3-container w3-border" style={{paddingTop: "8px", paddingBottom: "8px", marginTop: "8px"}}>
                    <TestComponent fontSize={this.state.fontSize}/>
                </div>
            </div>
        );
    }
}