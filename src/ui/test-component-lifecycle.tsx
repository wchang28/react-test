import * as React from 'react';
import {useState} from "react";
import {FontSize, getFontSizeSelector, getOptionSelector, TestingPane, ConfigurationPane} from "./test-common";

type TestMethod = "Component Class" | "Functional";
const allTestMethods: TestMethod[] = ["Component Class","Functional"];

const functionalName = "TestFunctional";
const componentName = "TestComponent";

function getUI(testMethod: TestMethod, fontSize: FontSize, good: boolean, onToggleClick: () => void) {
    const className = `w3-button w3-border w3-round w3-${fontSize}`;
    return (
        <div>
            <div>"{testMethod}" says: Today is a <span className={`w3-${good ? "green": "red"}`} style={{fontWeight:"bold"}}>{good ? "GOOD": "BAD"}</span> day.</div>
            <div>
                <button className={className} onClick={onToggleClick}>Toggle Good/Bad</button>
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
    return getUI("Functional", props.fontSize, good, () => {setGood(!good);});
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
        const props = this.props;
        return getUI("Component Class", this.props.fontSize, this.state.good, this.onToggleClick);
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

export default () => {
    const [testMethod, setTestMethod] = useState<TestMethod>("Component Class");
    const [fontSize, setFontSize] = useState<FontSize>("medium");
    const ComponentUnderTest = (testMethod === "Component Class" ? TestComponent : TestFunctional);
    return (
        <TestingPane>
            <ConfigurationPane>
                {getOptionSelector(allTestMethods, "Test Method:", testMethod, setTestMethod)}
                {getFontSizeSelector(fontSize, setFontSize)}
            </ConfigurationPane>
            <ComponentUnderTest fontSize={fontSize}/>
        </TestingPane>
    );
}