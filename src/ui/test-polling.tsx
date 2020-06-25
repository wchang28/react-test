import React, {useState, useEffect} from "react";
import {TestingPane, ConfigurationPane, getOptionSelector} from "./test-common";
import {usePolling, useComponentDidMount, ReactProps} from "./react-utils";

type MaterialIconTheme = "Material+Icons" | "Material+Icons+Outlined" | "Material+Icons+Sharp" | "Material+Icons+Round" | "Material+Icons+Two+Tone"
const allMaterialIconThemes: MaterialIconTheme[] = ["Material+Icons", "Material+Icons+Outlined", "Material+Icons+Sharp", "Material+Icons+Round", "Material+Icons+Two+Tone"];

type FontawesomeVersion = "4.7.0" | "5.13.1";
const allFontawesomeVersions: FontawesomeVersion[] = ["4.7.0", "5.13.1"];

function ContentDisplay(props: ReactProps<{contentName: string, content: string}>) {
    const {contentName, content} = props;
    return (
        <div className="w3-margin-top w3-border">
            <div className="w3-green">{contentName}</div>
            <div>{content}</div>
        </div>
    );
}

interface Props {
    materialIconTheme: MaterialIconTheme;
    fontawesomeVersion: FontawesomeVersion;
}

function TestUI(props: ReactProps<Props>) {
    const {materialIconTheme, fontawesomeVersion} = props;
    
    const [materialIconCSS, setMaterialIconCSS] = useState("");
    const [fontawesomeCSS, setFontawesomeCSS] = useState("");
    const [w3CSS, setW3CSS] = useState("");

    const getMaterialIconCSSPollingFunction = (theme: MaterialIconTheme) => {
        return async () => {
            console.log(`getting icon theme ${theme} from Google...`);
            const url = `https://fonts.googleapis.com/css?family=${theme}`;
            const res = await fetch(url, {mode: "cors"});
            const css =  await res.text();
            return css;
        }
    };
    usePolling(TestUI, materialIconTheme, getMaterialIconCSSPollingFunction, setMaterialIconCSS, 5);

    const getFontawesomeCSSPollingFunction = (version: FontawesomeVersion) => {
        return async () => {
            console.log(`getting fontawesome ${version} from cdnjs.com...`);
            const url = `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/${version}/css/font${(version === "4.7.0" ? "-" : "")}awesome.min.css`;
            const res = await fetch(url, {mode: "cors"});
            const css =  await res.text();
            return css;
        }
    };
    usePolling(TestUI, fontawesomeVersion, getFontawesomeCSSPollingFunction, setFontawesomeCSS, 8);

    useComponentDidMount(async () => {
        console.log(`getting W3.css...`);
        const url = "https://cdnjs.cloudflare.com/ajax/libs/w3-css/4.1.0/3/w3.css";
        const res = await fetch(url, {mode: "cors"});
        const css =  await res.text();
        return css;
    }, setW3CSS, (err: any) => {
        console.error(`!!! Error getting W3.CSS: ${err}`);
    });

    const [isActive] = useState(true);
    useEffect(() => {
        console.log("component mounted");
        return () => {
            console.log("component un-mount");
        };
    }, [isActive]);

    return (
        <div className="w3-container w3-tiny">
            <ContentDisplay contentName="Material Icon CSS" content={materialIconCSS}/>
            <ContentDisplay contentName="Fontawesome CSS" content={fontawesomeCSS}/>
            <ContentDisplay contentName="W3.CSS" content={w3CSS}/>
        </div>
    );
}

export default () => {
    const [materialIconTheme, setMaterialIconTheme] = useState<MaterialIconTheme>("Material+Icons");
    const [fontawesomeVersion, setFontawesomeVersion] = useState<FontawesomeVersion>("4.7.0");
    return (
        <TestingPane>
            <ConfigurationPane>
                 {getOptionSelector(allMaterialIconThemes, "Material Icon Theme", materialIconTheme, setMaterialIconTheme)}
                 {getOptionSelector(allFontawesomeVersions, "Fontawesome Version", fontawesomeVersion, setFontawesomeVersion)}
            </ConfigurationPane>
            <TestUI materialIconTheme={materialIconTheme} fontawesomeVersion={fontawesomeVersion}/>
        </TestingPane>
    );
}