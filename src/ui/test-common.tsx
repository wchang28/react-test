import React from "react";
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
