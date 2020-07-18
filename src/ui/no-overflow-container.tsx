import * as React from "react";
import {ReactNode} from "react";
import {createUseStyles} from 'react-jss';

const cf = {content: '""', display: "table", clear: "both"};
const clearFloat = {"&:before": cf, "&:after": cf};

const useStyles = createUseStyles({
    noOverflowContainer: {
        ...clearFloat,
        overflow: "hidden",
        height: ({height}) => height,
        width: ({width}) => width
    }
});

export interface Props {
    height?: number | string;
    width?: number | string;
}

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export default function NoOverflowContainer(props: ReactProps<Props>) {
    const {height, width, children} = props;
    const classes = useStyles({height, width});
    return <div className={classes.noOverflowContainer}>{children}</div>;
}

NoOverflowContainer.defaultProps = {
    height: "100%"
    ,width: "100%"
} as Props