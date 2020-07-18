import * as React from "react";
import {ReactNode} from "react";
import {createUseStyles} from 'react-jss';

// inner content need to have css "display: table-row;":
// https://stackoverflow.com/questions/17405982/set-width-of-inner-div-on-scrollable-element-to-100-of-scrollable-width

const cf = {content: '""', display: "table", clear: "both"};
const clearFloat = {"&:before": cf, "&:after": cf};

const useStyles = createUseStyles({
    scrollViewMainContainer: {
        ...clearFloat,
        overflow: "auto",
        "white-space": "nowrap",
        height: ({height}) => height,
        width: ({width}) => width
    },
    scrollViewInnerContainer: {
        ...clearFloat,
        display:"table-row"
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
    return (
        <div className={classes.scrollViewMainContainer}>
            <div className={classes.scrollViewInnerContainer}>
                {children}
            </div>
        </div>
    );
};