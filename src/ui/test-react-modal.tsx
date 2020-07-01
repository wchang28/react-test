import React, {useState} from "react";
import ReactModal from 'react-modal';
import {FontSize, getFontSizeSelector, TestingPane, ConfigurationPane, FontSizeColorTestingWrapper, getButton} from "./test-common";

export default () => {
    const onTest = () => {
        alert("Hi");
    };
    return (
        <TestingPane>
            <div style={{width: "250px"}}>
                <ConfigurationPane>
                    {getButton("Show Modal", onTest)}
                </ConfigurationPane>
            </div>
        </TestingPane>
    );
};