import React, {useState, useEffect, ReactNode} from "react";
import {TestingPane, ConfigurationPane, getOptionSelector} from "./test-common";
import * as pl from "../utils/polling";
import {uuid} from "./utils";

type MaterialIconTheme = "Material+Icons" | "Material+Icons+Outlined" | "Material+Icons+Sharp" | "Material+Icons+Round" | "Material+Icons+Two+Tone"
const allMaterialIconThemes: MaterialIconTheme[] = ["Material+Icons", "Material+Icons+Outlined", "Material+Icons+Sharp", "Material+Icons+Round", "Material+Icons+Two+Tone"];

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

interface Props {
    materialIconTheme: MaterialIconTheme
}

function TestContent(props: ReactProps<Props>) {
    const {materialIconTheme} = props;
    const [identifier] = useState(uuid());
    const [isActive] = useState(true);
    const [css, setCSS] = useState("");
    const getPollingFunc = (theme: MaterialIconTheme) => {
        return async () => {
            console.log(`getting theme ${theme} from Google...`);
            const url = `https://fonts.googleapis.com/css?family=${theme}`
            const res = await fetch(url, {mode: "cors"});
            const s = await res.text();
            if (TestContent.mountFlag[identifier]) {
                setCSS(s);
            }
        };
    }
    const [polling] = useState(pl.Polling.get(getPollingFunc(materialIconTheme), 5)
    .on("state-change", (state) => {
        console.log(`<<state-change>>: state=${state}`);
    }));

    useEffect(() => {
        TestContent.mountFlag[identifier] = true;
        polling.start();
        return () => {
            console.log(`\nSTOPPING the polling... (current state=${polling.state})`);
            polling.stop()
            .then(() => {
                console.log(`polling STOPPED. (current state=${polling.state})`);
            });
            delete TestContent.mountFlag[identifier];
        }
    }, [isActive]);

    useEffect(() => {
        polling.pollingFunction = getPollingFunc(materialIconTheme);
    }, [materialIconTheme]);

    return (
        <div className="w3-container w3-border">
            {css}
        </div>
    );
}

TestContent.mountFlag = {} as {[id: string]: boolean};

export default () => {
    const [materialIconTheme, setMaterialIconTheme] = useState<MaterialIconTheme>("Material+Icons");
    return (
        <TestingPane>
            <ConfigurationPane>
                 {getOptionSelector(allMaterialIconThemes, "Material Icon Theme", materialIconTheme, setMaterialIconTheme)}
            </ConfigurationPane>
            <TestContent  materialIconTheme={materialIconTheme}/>
        </TestingPane>
    );
}