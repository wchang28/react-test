import * as React from "react";
import {useState, useEffect, ReactNode} from "react";
import * as pl from "interval-polling";

export type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export type FetchFunction<FD = any> = () => Promise<FD>;

export function useComponentDidMount<FD = any>(
    fetch: FetchFunction<FD>
    ,setFetchData: React.Dispatch<React.SetStateAction<FD>>
    ,onerror?: (err: any) => void
) {
    if (typeof fetch !== "function") throw "invalid fetch function";
    if (typeof setFetchData !== "function") throw "invalid set fetch data function";
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

export interface DynamicFetch<FD = any> {
    params: any;
    getter: (fetchParams: any) => FetchFunction<FD>;
}

export function useIntervalPolling<P = any, FD = any>(
    functionalComponent: (props: ReactProps<P>) => JSX.Element
    ,fetch: DynamicFetch<FD> | FetchFunction<FD>
    ,setFetchData: React.Dispatch<React.SetStateAction<FD>>
    ,intervalSec: number
    ,onerror?: (err: any) => void
) {
    if (typeof functionalComponent !== "function") throw "invalid functional component";
    const funcComp = (functionalComponent as any) as {__pollingInfo__: {[id: string]: {firstCall?: boolean}}};
    if (!funcComp.__pollingInfo__) funcComp.__pollingInfo__ = {};
    if (!fetch) throw "invalid fetch argument";
    if (typeof setFetchData !== "function") throw "invalid set fetch data function";
    const staticFetching = (typeof fetch === "function");
    const dynamicFetching = !staticFetching;
    const dynamicFetch = (staticFetching ? undefined : fetch as DynamicFetch<FD>);
    const staticFetcher = (staticFetching ? fetch as FetchFunction<FD> : undefined);
    if (dynamicFetching && typeof dynamicFetch.getter !== "function") {
        throw "invalid getter from dynamic fetching";
    }
    const [pollingIdentifier] = useState(uuid());
    
    const handleFetchData = (data: FD) => {
        if (funcComp.__pollingInfo__[pollingIdentifier]) {
            setFetchData(data);
        }
    };
    const getDynamicPollingFunc = (fetchParams: any) => {
        return async () => {
            const fetcher = dynamicFetch.getter(fetchParams);
            if (typeof fetcher === "function") {
                const data = await fetcher();
                handleFetchData(data);
            }
        };
    };
    const staticPollingFunction = async () => {
        const data = await staticFetcher();
        handleFetchData(data);
    }
    const [polling] = useState(pl.Polling.get(staticFetching ? staticPollingFunction : getDynamicPollingFunc(dynamicFetch.params), intervalSec)
    .on("after-poll", (err) => {
        if (onerror && err) {
            onerror(err);
        }
    }));

    // for mounting/un-mounting
    ////////////////////////////////////////////////////////////////////////////////
    const [isActive] = useState(true);
    useEffect(() => {
        funcComp.__pollingInfo__[pollingIdentifier] = {firstCall: (dynamicFetching ? true : undefined)};
        polling.start();
        return () => {
            polling.stop();
            delete funcComp.__pollingInfo__[pollingIdentifier];
        }
    }, [isActive]);
    ////////////////////////////////////////////////////////////////////////////////

    // for dynamic fetching only
    ////////////////////////////////////////////////////////////////////////////////
    if (dynamicFetching) {
        // reset polling function only dynamicFetch.params has changed
        useEffect(() => {
            const pollingFunc = getDynamicPollingFunc(dynamicFetch.params);
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
        }, [dynamicFetch.params]);
    }
    ////////////////////////////////////////////////////////////////////////////////
}