import * as React from 'react';
import {useState} from "react";

type TestMethod = "component class" | "functional";
const allTestMethods: TestMethod[] = ["component class","functional"];

type FontSize = "tiny" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "xxxlarge" | "jumbo";
const allFontSizes: FontSize[] = ["tiny","small","medium","large","xlarge","xxlarge","xxxlarge","jumbo"];

const functionalName = "TestFunctional";
const componentName = "TestComponent";

function getUI(fontSize: FontSize, good: boolean, onButtonClick: () => void) {
    const className = `w3-button w3-border w3-round w3-${fontSize}`;
    return (
        <div>
            <div>Today is a <span className={`w3-${good ? "green": "red"}`} style={{fontWeight:"bold"}}>{good ? "GOOD": "BAD"}</span> day.</div>
            <div>
                <button className={className} onClick={onButtonClick}>Toggle Good/Bad</button>
            </div>
        </div>
    );
}

interface TestProps {
    fontSize: FontSize;
}

function TestFunctional(props: TestProps) {
    console.log(`${functionalName}.render()`);
    const [good, setGood] = useState(true);
    return getUI(props.fontSize, good, () => {setGood(!good);});
}

interface TestComponentState {
    good: boolean;
}

class TestComponent extends React.Component<TestProps, TestComponentState> {
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
    static getDerivedStateFromProps(nextProps: TestProps, currState: TestComponentState) {
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
        return getUI(this.props.fontSize, this.state.good, this.onToggleClick);
    }
    // called after mounting render()
    componentDidMount() {
        console.log(`${componentName}.componentDidMount()`);
    }
    // called everytime after the non-mounting render()
    componentDidUpdate(prevProps: TestProps, prevState: TestComponentState, snapshot: any) {
        console.log(`${componentName}.componentDidUpdate():\nprevProps=${JSON.stringify(prevProps)}\nprevState=${JSON.stringify(prevState)}`);
    }
    componentWillUnmount () {
        console.log(`${componentName}.componentWillUnmount()`);
    }
}

interface State {
    testMethod: TestMethod;
    fontSize: FontSize;
}

export class Test extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            testMethod: "component class"
            ,fontSize: "medium"
        };
    }
    onTestMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({testMethod: event.target.value as TestMethod});
    }
    onFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({fontSize: event.target.value as FontSize});
    }
    render() {
        const testMethodOptions = allTestMethods.map((item, index) => {
            return (<option key={index} value={item}>{item}</option>);
        });
        const fontSizeOptions = allFontSizes.map((item, index) => {
            return (<option key={index} value={item}>{item}</option>);
        });
        const Component = (this.state.testMethod === "component class" ? TestComponent : TestFunctional);
        return (
            <div>
                <div className="w3-container w3-border" style={{padding: "0 8px", marginTop: "8px"}}>
                    <p>
                        <label>Test Method: </label>
                        <select className="w3-select w3-border" name="testMethod" value={this.state.testMethod} onChange={this.onTestMethodChange} style={{padding: "4px", width: "30%"}}>
                            {testMethodOptions}
                        </select>
                    </p>
                    <p>
                        <label>Font Size: </label>
                        <select className="w3-select w3-border" name="fontSize" value={this.state.fontSize} onChange={this.onFontSizeChange} style={{padding: "4px", width: "30%"}}>
                            {fontSizeOptions}
                        </select>
                    </p>
                </div>
                <div className="w3-container w3-border" style={{paddingTop: "8px", paddingBottom: "8px", marginTop: "8px"}}>
                    <Component fontSize={this.state.fontSize}/>
                </div>
            </div>
        );
    }
}