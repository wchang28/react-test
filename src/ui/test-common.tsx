import React, {ReactNode} from "react";

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
            <select className="w3-select w3-border" value={(value as any) as string} onChange={(event) => {onChange((event.target.value) as any as VT);}} style={{padding: "4px"}}>
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
    className?: string;
}

export function TestingPane(props: ReactProps<TestPaneProps>) {
    const cofigurationPane = props.children[0];
    const displayPane = props.children[1];
    return (
        <div className={props.className}>
            <div className="w3-container w3-border" style={{padding: "0 8px", marginTop: "8px"}}>
                {cofigurationPane}
            </div>
            <div className="w3-container w3-border" style={{paddingTop: "8px", paddingBottom: "8px", marginTop: "8px"}}>
                {displayPane}
            </div>
        </div>
    )
}

export function FontSizeTestingWrapper(props: ReactProps<{fontSize: FontSize}>) {
    return (
        <div className={`w3-${props.fontSize}`}>
            {props.children}
        </div>
    );
}