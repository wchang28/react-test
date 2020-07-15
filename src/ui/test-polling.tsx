import React, {useState, useEffect} from "react";
import {TestingPane, ConfigurationPane, getOptionSelector, getCheckbox} from "./test-common";
import {useIntervalPolling, useComponentDidMount, ReactProps} from "./react-utils";

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
    materialIconTheme: MaterialIconTheme | null;
    fontawesomeVersion: FontawesomeVersion | null;
}

function TestUI(props: ReactProps<Props>) {
    const {materialIconTheme, fontawesomeVersion} = props;
    
    const [materialIconCSS, setMaterialIconCSS] = useState("");
    const [fontawesomeCSS, setFontawesomeCSS] = useState("");
    const [w3CSS, setW3CSS] = useState("");
    const [bootstrapCSS, setBootstrapCSS] = useState("");

    const getMaterialIconCSSFetcher = (theme: MaterialIconTheme) => {
        return (
            theme ?
            async () => {
                console.log(`getting icon theme <<${theme}>> from Google...`);
                const url = `https://fonts.googleapis.com/css?family=${theme}`;
                const res = await fetch(url, {mode: "cors"});
                const css =  await res.text();
                return css;
            }
            : null
        );
    };
    useIntervalPolling(TestUI, {params: materialIconTheme, getter: getMaterialIconCSSFetcher}, setMaterialIconCSS, 5);

    const getFontawesomeCSSFetcher = (version: FontawesomeVersion) => {
        return (
            version ?
            async () => {
                console.log(`getting fontawesome <<${version}>> from cdnjs.com...`);
                const url = `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/${version}/css/font${(version === "4.7.0" ? "-" : "")}awesome.min.css`;
                const res = await fetch(url, {mode: "cors"});
                const css =  await res.text();
                return css;
            }
            : null
        );
    };
    useIntervalPolling(TestUI, {params: fontawesomeVersion, getter: getFontawesomeCSSFetcher}, setFontawesomeCSS, 8);

    const w3CSSFetcher = async () => {
        console.log(`getting W3.css...`);
        const url = "https://cdnjs.cloudflare.com/ajax/libs/w3-css/4.1.0/3/w3.css";
        const res = await fetch(url, {mode: "cors"});
        const css =  await res.text();
        return css;
    };
    useIntervalPolling(TestUI, w3CSSFetcher, setW3CSS, 10);

    const bootstrapCSSFetcher = async () => {
        console.log(`getting Bootstrap css...`);
        const url = "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css";
        const res = await fetch(url, {mode: "cors"});
        const css =  await res.text();
        return css;
    };
    useComponentDidMount(bootstrapCSSFetcher, setBootstrapCSS);

    const [isActive] = useState(true);
    useEffect(() => {
        console.log("component mounted");
        return () => {
            console.log("component un-mount");
        };
    }, [isActive]);

    return (
        <div className="w3-tiny">
            <ContentDisplay contentName="Material Icon CSS" content={materialIconCSS}/>
            <ContentDisplay contentName="Fontawesome CSS" content={fontawesomeCSS}/>
            <ContentDisplay contentName="W3.CSS" content={w3CSS}/>
            <ContentDisplay contentName="Bootstrap CSS" content={bootstrapCSS}/>
        </div>
    );
}

export default () => {
    const [materialIconTheme, setMaterialIconTheme] = useState<MaterialIconTheme>("Material+Icons");
    const [stopPollingMaterialIcon, setStopPollingMaterialIcon] = useState(false);
    const [fontawesomeVersion, setFontawesomeVersion] = useState<FontawesomeVersion>("4.7.0");
    const [stopPollingFontawesome, setStopPollingFontawesome] = useState(false);
    return (
        <TestingPane>
            <ConfigurationPane>
                 {getOptionSelector(allMaterialIconThemes, "Material Icon Theme", materialIconTheme, setMaterialIconTheme)}
                 {getCheckbox("Stop Polling Material Icon", stopPollingMaterialIcon, setStopPollingMaterialIcon)}
                 {getOptionSelector(allFontawesomeVersions, "Fontawesome Version", fontawesomeVersion, setFontawesomeVersion)}
                 {getCheckbox("Stop Polling Fontawesome", stopPollingFontawesome, setStopPollingFontawesome)}
            </ConfigurationPane>
            <TestUI materialIconTheme={(stopPollingMaterialIcon ? null : materialIconTheme)} fontawesomeVersion={(stopPollingFontawesome ? null : fontawesomeVersion)}/>
        </TestingPane>
    );
}