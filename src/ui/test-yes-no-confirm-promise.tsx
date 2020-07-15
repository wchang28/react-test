import React, {useState} from 'react';
import {YesOrNo} from "./yes-no-confirm";

export default () => {
    const [confirmBox, setConfirmBox] =  useState<JSX.Element>(null);
    const onTest = async () => {
        const confirm = await YesOrNo(setConfirmBox, "Are you sure you want to save the file?\nIt is OK to say Yes.\nit is also OK to say No.", 300, "Confirm Save");
        alert(`${confirm ? "Yes" : "No"} was selected`);        
    } 
    return (
        <div>
            <div style={{padding: "8px"}}>
                <button className="w3-button w3-border w3-round" onClick={onTest}>Test confirm()</button>
            </div>
            <div className="w3-small">
                {confirmBox}
            </div>
        </div>
    );  
}