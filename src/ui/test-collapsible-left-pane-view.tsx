import React, {useState} from "react";
import CollapsibleLeftPaneView from "./collapsible-left-pane-view";

const leftPaneContent = (
<div className="left-content">
    Hello,---------World!<br/>
    Hello,---------World!<br/>
    Hello,---------World!<br/>
    Hello,---------World!<br/>
    Hello,---------World!<br/>
    Hello,---------World!<br/>
    Hello,---------World!<br/>
    Hello,---------World!<br/>
</div>
);
    
const rightPaneContent = (
<div className="right-content">
    Hawdy, World!<br/>
    Hawdy, World!<br/>
    Hawdy, World!<br/>
    Hawdy, World!<br/>
    Hawdy, World!<br/>
</div>
);

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
            <CollapsibleLeftPaneView collapsed={collapsed} leftPaneWidthPx={leftPaneWidthPx} onCollapseChanged={(collapsed) => {setCollapsed(collapsed);}}>
                {leftPaneContent}
                {rightPaneContent}
            </CollapsibleLeftPaneView>
        </div>
    </div>
    );
}