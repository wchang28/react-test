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
        width: ({width}) => width,
        border: ({hasBorder}) => (hasBorder ? "1px solid #ccc" : undefined)
    },
    innerContainer: {
        ...clearFloat,
        display:"table-row"
    }
});

export interface Props {
    height: number | string;
    width?: number | string;
    hasBorder?: boolean;
}

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export default (props: ReactProps<Props>) => {
    const {height, width, hasBorder, children} = props;
    const classes = useStyles({height, width, hasBorder});
    return (
        <div className={classes.mainContainer}>
            <div className={classes.innerContainer}>
                {children}
            </div>
        </div>
    );
};