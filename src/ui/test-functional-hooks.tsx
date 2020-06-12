import * as React from "react";
import {useState, useEffect} from 'react';

export default () => {
    const [isActive] = useState<boolean>(true);
    const [currentTime, setCurrentTime] = useState<number>(new Date().getTime());
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