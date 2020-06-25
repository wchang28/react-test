import React, {useState, useEffect, ReactNode} from "react";
import * as pl from "../utils/polling";

export type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export type FetchFunction<FD = any> = () => Promise<FD>;

export function useComponentDidMount<FD = any>(
    fetch: FetchFunction<FD>
    ,setFetchData: React.Dispatch<React.SetStateAction<FD>>
    ,onerror?: (err: any) => void
) {
    const [isActive] = useState(true);
    useEffect(() => {
        fetch()
        .then((data) => {
            setFetchData(data);
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

export function usePolling<P = any, FP = any, FD = any>(
    functionalComponent: (props: ReactProps<P>) => JSX.Element
    ,fetchParams: FP
    ,fetchGetter: (fetchParams: FP) => FetchFunction<FD>
    ,setFetchData: React.Dispatch<React.SetStateAction<FD>>
    ,intervalSec: number
    ,onerror?: (err: any) => void
) {
    const funcComp = (functionalComponent as any) as {__pollingInfo__: {[id: string]: {firstCall: boolean}}};
    if (!funcComp.__pollingInfo__) funcComp.__pollingInfo__ = {};
    const [pollingIdentifier] = useState(uuid());
    const [isActive] = useState(true);
    const getPollingFunc = (fp: FP) => {
        return async () => {
            const fetch = fetchGetter(fp);
            const data = await fetch();
            if (funcComp.__pollingInfo__[pollingIdentifier]) {
                setFetchData(data);
            }
        };
    };
    const [polling] = useState(pl.Polling.get(getPollingFunc(fetchParams), intervalSec)
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
        const pollingFunc = getPollingFunc(fetchParams);
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
    }, [fetchParams]);
}