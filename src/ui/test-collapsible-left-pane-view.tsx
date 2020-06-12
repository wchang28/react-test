import React, {useState} from "react";
import CollapsibleLeftPaneView from "./collapsible-left-pane-view";

export default () => {
    const [collapsed, setCollapsed] = useState(false);
    const [leftPaneWidthPx, setLeftPaneWidthPx] = useState(250);
    const onCollpaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCollapsed(event.target.checked);
    }
    const onLeftPaneWidthPxChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLeftPaneWidthPx(event.target.valueAsNumber);
    }
    return (
    <div>
        <div className="w3-container w3-border" style={{padding: "0 8px", marginTop: "8px"}}>
            <p>
                <input className="w3-check" type="checkbox" checked={collapsed} onChange={onCollpaseChange}/>
                <label>Collapsed</label>
            </p>
            <p>
                <label>Left Pane Width px</label>
                <input className="w3-input w3-border" type="number" value={leftPaneWidthPx} onChange={onLeftPaneWidthPxChanged}/>
            </p>
        </div>
        <div className="w3-container w3-border" style={{paddingTop: "8px", paddingBottom: "8px", marginTop: "8px"}}>
            <CollapsibleLeftPaneView collapsed={collapsed} leftPaneWidthPx={leftPaneWidthPx} onCollapseChanged={(collapsed) => {setCollapsed(collapsed);}}/>
        </div>
    </div>
    );
}