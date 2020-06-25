import * as events from "events";

export type PollingFunction<T = any> = () => Promise<T>;

export type State = "idle" | "polling" | "ticking";

export interface IPolling<T = any> {
    readonly state: State;
    readonly started: boolean;
    intervalSeconds: number;
    pollingFunction: PollingFunction<T>;
    start(): void;
    stop(): Promise<void>;
    on(event: "before-poll", listner: () => void): this;
    on(event: "after-poll", listner: (err?: any, value?: T) => void): this;
    on(event: "state-change", listener: (state: State) => void): this;
}

const DEFAULT_INTERVAL_SECONDS = 1;

class PollingClass<T> extends events.EventEmitter {
    private __stopSignaled: boolean;
    private __pollingPromise: Promise<T>;
    private __timer: any;
    constructor(private __pollingFunction: PollingFunction<T>, private __intervalSeconds: number) {
        super();
        this.__stopSignaled = false;

        this.__pollingPromise = null;
        this.__timer = null;
        // state === 'idle'
    }
    get intervalSeconds() {
        return (typeof this.__intervalSeconds === "number" && this.__intervalSeconds > 0 ? this.__intervalSeconds : DEFAULT_INTERVAL_SECONDS);
    }
    set intervalSeconds(value: number) {
        if (typeof value === "number" && value > 0) {
            this.__intervalSeconds = value;
        }
    }
    get pollingFunction() {
        return this.__pollingFunction;
    }
    set pollingFunction(value: PollingFunction<T>) {
        this.__pollingFunction = value;
    }
    get state(): State {
        if (this.__pollingPromise) {
            return "polling";
        } else if (this.__timer) {
            return "ticking";
        } else {
            return "idle";
        }
    }
    private setTimeout() {
        const callback = this.pollingProc.bind(this);
        const timeout = this.intervalSeconds * 1000;
        if (global.window) {
            return window.setTimeout(callback, timeout);
        } else {
            return setTimeout(callback, timeout);
        }
    }
    private handleAfterPolling(err: any, value: T) {
        this.__pollingPromise = null;
        if (this.__stopSignaled) {
            this.__stopSignaled = false;
            this.__timer = null;
            // state === 'idle'
        } else {
            this.__timer = this.setTimeout();
            // state === 'ticking'
        }
        this.emit("state-change", this.state);
        this.emit("after-poll", err, value);
    }
    private pollingProc() {
        this.emit("before-poll");
        const pollingFunction = this.__pollingFunction;
        this.__pollingPromise = pollingFunction();
        this.__timer = null;
        // state === 'polling'
        this.emit("state-change", this.state);
        this.__pollingPromise
        .then((value: T) => {
            this.handleAfterPolling(null, value);
        }).catch((err: any) => {
            this.handleAfterPolling(err, null);
        });
    }
    public get started() {
        return (this.state !== "idle");
    }
    public start() {
        if (this.state === "idle") {
            this.pollingProc();
        }
    }
    public async stop() {
        if (this.state === "ticking") {
            clearTimeout(this.__timer);
            this.__timer = null;
            // state === 'idle'
            this.emit("state-change", this.state);
        } else if (this.state === "polling") {
            this.__stopSignaled = true; // signaling the stop
            try {
                await this.__pollingPromise;
            } catch (e) {}
        }
    }
}

export class Polling {
    public static get<T = any>(pollingFunction: PollingFunction<T>, intervalSeconds: number): IPolling<T> {
        return new PollingClass<T>(pollingFunction, intervalSeconds);
    }
}