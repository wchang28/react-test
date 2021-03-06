import * as React from "react";
import {useState, useEffect} from 'react';

export default () => {
    console.log(`calling render()...`);
    const [isActive] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date().getTime());
    useEffect(() => {
        console.log(`useEffect Hook called`);
        const interval = window.setInterval(() => {
            console.log(`interval tick()...`);
            setCurrentTime(new Date().getTime());
        }, 2000);
        return () => {
            console.log(`useEffect Hook cleanup() called`);
            window.clearInterval(interval);
        }
    }, [isActive]);
    return (
        <div>Current Time: {currentTime}</div>
    )
} 