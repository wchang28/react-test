import * as React from 'react';
export interface Props {
    value?: {
        firstName?: string;
        lastName?: string;
    };
    onChange?: (value: {
        firstName?: string;
        lastName?: string;
    }) => void;
}
export interface State {
    name?: {
        firstName?: string;
        lastName?: string;
    };
}
export declare class NameEntry extends React.Component<Props, State> {
    constructor(props: any);
    static getDerivedStateFromProps(props: Props, state: State): {
        name: {
            firstName: string;
            lastName: string;
        };
    };
    onFirstNameChanged(event: React.ChangeEvent<HTMLInputElement>): void;
    onLastNameChanged(event: React.ChangeEvent<HTMLInputElement>): void;
    render(): JSX.Element;
}
