import * as React from 'react';

type FontSize = "tiny" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "xxxlarge" | "jumbo";
const allFontSizes: FontSize[] = ["tiny","small","medium","large","xlarge","xxlarge","xxxlarge","jumbo"];

interface TestComponentProps {
    fontSize: FontSize;
}

interface TestComponentState {
    good: boolean;
}

class TestComponent extends React.Component<TestComponentProps, TestComponentState> {
    constructor(props: any) {
        super(props);
        console.log(`TestComponent.ctor()`);
        this.state = {
            good: true
        }
    }
    static getDerivedStateFromProps(nextProps: TestComponentProps, prevState: TestComponentState) {
        console.log(`TestComponent.getDerivedStateFromProps():\nnextProps=${JSON.stringify(nextProps)},\nprevState=${JSON.stringify(prevState)}`);
        return null;
    }
    _setState(st) {
        console.log(`Setting state: setState(${JSON.stringify(st)})`);
        this.setState(st);
    }
    onToggleClick = () => {
        this._setState({good: !this.state.good});
    }
    render() {
        console.log(`TestComponent.render()`);
        const className = `w3-button w3-border w3-round w3-${this.props.fontSize}`;
        return (
            <div>
                <div>Today is a {this.state.good ? "good": "bad"} day.</div>
                <div>
                    <button className={className} onClick={this.onToggleClick}>Toggle Good/Bad</button>
                </div>
            </div>
        );
    }
    componentDidMount() {
        console.log(`TestComponent.componentDidMount()`);
    }
    componentDidUpdate() {
        console.log(`TestComponent.componentDidUpdate()`);
    }
    componentWillUnmount () {
        console.log(`TestComponent.componentWillUnmount()`);
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