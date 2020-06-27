import React, {useState} from 'react';
import Alert, {Importance, HorzontalLocation, VerticalLocation} from "./alert";
import {FontSize, getFontSizeSelector, TestingPane, ConfigurationPane, FontSizeColorTestingWrapper, getOptionSelector, getCheckbox, getButton} from "./test-common";

const allImportances: Importance[] = ["error" , "success" , "warning" , "info"];
const allHorizontalLocations: HorzontalLocation[] = ["left" , "center" , "right"];
const allVerticalLocations: VerticalLocation[] = ["top" , "middle" , "bottom"];

const TEXT_MESSAGE = "This is a message for the Alert box. Supports:\n\nMultiple lines\nImportance\nLocation";

export default () => {
    const [message, setMessage] = useState<string>(null);
    const [importance, setImportance] = useState<Importance>("info");
    const [strong, setStrong] = useState(true);
    const [horizontalLocation, setHorizontalLocation] = useState<HorzontalLocation>("center");
    const [verticalLocation, setVerticalLocation] = useState<VerticalLocation>("top");
    const [fontSize, setFontSize] = useState<FontSize>("small");
    const showMessage = (message ? true : false);
    const alert = (showMessage ? 
        <FontSizeColorTestingWrapper fontSize={fontSize}>
            <Alert
                message={message}
                importance={importance}
                strong={strong}
                horizontalLocation={horizontalLocation}
                verticalLocation={verticalLocation}
                onClose={() => {setMessage(null);}}
            />
        </FontSizeColorTestingWrapper>
        : null);
    return (
        <TestingPane>
            <div style={{width: "250px"}}>
                <ConfigurationPane>
                    {getOptionSelector(allImportances, "Importance", importance, setImportance)}
                    {getCheckbox("Strong", strong, setStrong)}
                    {getOptionSelector(allHorizontalLocations, "Horizontal Location", horizontalLocation, setHorizontalLocation)}
                    {getOptionSelector(allVerticalLocations, "Vertical Location", verticalLocation, setVerticalLocation)}
                    {getFontSizeSelector(fontSize, setFontSize)}
                    {getButton("Show Alert", () => {setMessage(TEXT_MESSAGE);})}
                    {alert}
                </ConfigurationPane>
            </div>
        </TestingPane>
    );
}