import React, {useState, useEffect, ReactNode} from "react";
import * as pl from "../utils/polling";

export type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export function useComponentDidMount<D = any>(
    fetchData: () => Promise<D>
    ,setData: React.Dispatch<React.SetStateAction<D>>
    ,onerror?: (err: any) => void
) {
    const [isActive] = useState(true);
    useEffect(() => {
        fetchData()
        .then((data) => {
            setData(data);
        }).catch((err: any) => {
            if (onerror) {
                onerror(err);
            }
        });
    }, [isActive]);
}

function uuid() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export function usePolling<P = any, PP = any, PR = any>(
    functionalComponent: (props: ReactProps<P>) => JSX.Element
    ,pollingParams: PP
    ,getPollingFunction: (pollingParams: PP) => () => Promise<PR>
    ,setPollingResult: React.Dispatch<React.SetStateAction<PR>>
    ,intervalSec: number
    ,onerror?: (err: any) => void
) {
    const funcComp = (functionalComponent as any) as {__pollingInfo__: {[id: string]: {firstCall: boolean}}};
    if (!funcComp.__pollingInfo__) funcComp.__pollingInfo__ = {};
    const [pollingIdentifier] = useState(uuid());
    const [isActive] = useState(true);
    const getPollingFunc = (pp: PP) => {
        return async () => {
            const pf = getPollingFunction(pp);
            const result = await pf();
            if (funcComp.__pollingInfo__[pollingIdentifier]) {
                setPollingResult(result);
            }
        };
    };
    const [polling] = useState(pl.Polling.get(getPollingFunc(pollingParams), intervalSec)
    .on("after-poll", (err) => {
        if (onerror) {
            onerror(err);
        }
    }));
    useEffect(() => {
        funcComp.__pollingInfo__[pollingIdentifier] = {firstCall: true};
        polling.start();
        return () => {
            polling.stop();
            delete funcComp.__pollingInfo__[pollingIdentifier];
        }
    }, [isActive]);

    useEffect(() => {
        const pollingFunc = getPollingFunc(pollingParams);
        polling.pollingFunction = pollingFunc;
        if (funcComp.__pollingInfo__[pollingIdentifier].firstCall) {
            funcComp.__pollingInfo__[pollingIdentifier].firstCall = false;
        } else {
            pollingFunc()
            .then(() => {})
            .catch((err) => {
                if (onerror) {
                    onerror(err);
                }
            });
        }
    }, [pollingParams]);
}