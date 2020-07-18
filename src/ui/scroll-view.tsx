import * as React from "react";
import {ReactNode} from "react";
import {createUseStyles} from 'react-jss';

const cf = {content: '""', display: "table", clear: "both"};
const clearFloat = {"&:before": cf, "&:after": cf};

const useStyles = createUseStyles({
    mainContainer: {
        ...clearFloat,
        overflow: "auto",
        "white-space": "nowrap",
        height: ({height}) => height,
        width: ({width}) => width
    }
});

export interface Props {
    height: number | string;
    width?: number | string;
}

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export default (props: ReactProps<Props>) => {
    const {height, width, children} = props;
    const classes = useStyles({height, width});
    return <div className={classes.mainContainer}>{children}</div>;
};