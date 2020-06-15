import React, {ReactNode, useState} from "react";
import CollapsibleLeftPaneView from "./collapsible-left-pane-view";

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export type FontSize = "tiny" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "xxxlarge" | "jumbo";
export const allFontSizes: FontSize[] = ["tiny","small","medium","large","xlarge","xxlarge","xxxlarge","jumbo"];

export type Color
= "amber"
| "aqua"
| "black"
| "blue"
| "blue-grey"
| "brown"
| "cyan"
| "dark-grey"
| "deep-orange"
| "deep-purple"
| "green"
| "grey"
| "indigo"
| "khaki"
| "light-blue"
| "light-green"
| "light-grey"
| "lime"
| "orange"
| "pale-blue"
| "pale-green"
| "pale-red"
| "pale-yellow"
| "pink"
| "purple"
| "red"
| "sand"
| "teal"
| "white"
| "yellow"
;

export const allColors: Color[] = [
    "amber"
    ,"aqua"
    ,"black"
    ,"blue"
    ,"blue-grey"
    ,"brown"
    ,"cyan"
    ,"dark-grey"
    ,"deep-orange"
    ,"deep-purple"
    ,"green"
    ,"grey"
    ,"indigo"
    ,"khaki"
    ,"light-blue"
    ,"light-green"
    ,"light-grey"
    ,"lime"
    ,"orange"
    ,"pale-blue"
    ,"pale-green"
    ,"pale-red"
    ,"pale-yellow"
    ,"pink"
    ,"purple"
    ,"red"
    ,"sand"
    ,"teal"
    ,"white"
    ,"yellow"
];

export function getOptionSelector<VT = string>(allOptions: VT[], label: string, value: VT, onChange: (value: VT) => void) {
    const options = allOptions.map((item, index) => {
        return (<option key={index} value={(item as any) as string}>{item}</option>);
    });
    return (
        <p>
            <label>{label}</label>
            <select className="w3-select w3-border" value={(value as any) as string} onChange={(event) => {onChange((event.target.value) as any as VT);}} style={{display:"block", padding: "4px"}}>
                {options}
            </select>
        </p>
    );
}

export const getFontSizeSelector = (fontSize: FontSize, onChange: (value: FontSize) => void) => getOptionSelector<FontSize>(allFontSizes, "Font Size:", fontSize, onChange);
export const getColorSelector = (color: Color, onChange: (value: Color) => void) => getOptionSelector<Color>(allColors, "Color:", color, onChange);
export const getCheckbox = (label: string, checked: boolean, onChange: (checked: boolean) => void) => {
    return (
        <p>
            <input className="w3-check" type="checkbox" checked={checked} onChange={(event) => {onChange(event.target.checked);}}/>
            <label> {label}</label>
        </p>
    );
}
export const getNumberInput = (label: string, value: number, onChange: (value: number) => void) => {
    return (
        <p>
            <label>{label}</label>
            <input className="w3-input w3-border" type="number" value={value} onChange={(event) => {onChange(event.target.valueAsNumber);}}/>
        </p>
    );
}

export const getTextInput = (label: string, value: string, onChange: (value: string) => void) => {
    return (
        <p>
            <label>{label}</label>
            <input className="w3-input w3-border" type="text" value={value} onChange={(event) => {onChange(event.target.value);}}/>
        </p>
    );
}

export interface TestPaneProps {
    testingClassName?: string;
}

export function TestingPane(props: ReactProps<TestPaneProps>) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        !props.children[1]
        ?
        <div className={props.testingClassName}>
            {props.children}
        </div>
        :
        <CollapsibleLeftPaneView
            collapsed={collapsed}
            onCollapseChanged={setCollapsed}
            leftPaneWidth="200px"
        >
            {props.children[0]}
            <div className={props.testingClassName}>
                {props.children[1]}
            </div>
        </CollapsibleLeftPaneView>
    );
}

export function ConfigurationPane(props: ReactProps<unknown>) {
    return (
        <div className="test-configuration w3-container w3-tiny">
            <div className="w3-light-blue w3-border w3-small" style={{fontWeight:"bold"}}>
                Configuration
            </div>
            {props.children}
        </div>
    );
}

export function FontSizeColorTestingWrapper(props: ReactProps<{fontSize: FontSize, color?: Color}>) {
    let className = `font-size-color-testing-wrapper w3-${props.fontSize}`;
    if (props.color) {
        className += ` w3-${props.color}`;
    }
    return (
        <div className={className}>
            {props.children}
        </div>
    );
}