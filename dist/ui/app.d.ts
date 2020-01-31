import * as React from 'react';
interface State {
    name?: {
        firstName?: string;
        lastName?: string;
    };
}
export declare class App extends React.Component<any, State> {
    constructor(props: any);
    onNameEntryChange(value: {
        firstName?: string;
        lastName?: string;
    }): void;
    render(): JSX.Element;
}
export {};
