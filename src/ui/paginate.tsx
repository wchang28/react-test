import * as React from "react";
import {ReactNode} from "react";
import ReactPaginate from 'react-paginate';
import {createUseStyles} from 'react-jss';

const BORDER_COLOR = "#ccc";
const LI_HOVER_COLOR = "#000";
const LI_HOVER_BACKGROUND_COLOR = "#ccc";

const liBaselineStyle = {
    padding: 0,
    margin: 0,
    float: "left",
    width: "auto",
    "border-right": `1px solid ${BORDER_COLOR}`,
    display: "block",
    outline: 0,
    "&:last-child": {
        "border-right":"none!important"
    },
    "&:hover": {
        color: `${LI_HOVER_COLOR}!important`,
        "background-color": `${LI_HOVER_BACKGROUND_COLOR}!important`
    }
};

const useStyles = createUseStyles({
    paginateOuterContainer: {
        "line-height": 0,
        "text-align": ({horizontalAlignment}) => horizontalAlignment
    },
    paginateContainer: {
        width: "auto",
        display: "inline-block",
        "line-height": "normal",
        "list-style-type": "none",
        padding: 0,
        margin: 0,
        border: `1px solid ${BORDER_COLOR}`
    },
    paginate_li: {
        ...liBaselineStyle
    },
    paginate_li_disabled: {
        ...liBaselineStyle,
        opacity: "0.3!important"
    },
    paginate_link: {
        outline: 0,
        padding: "0.5em 0.8em",
        border: "none",
        display: "inline-block",
        "vertical-align": "middle",
        overflow: "hidden",
        "text-decoration": "none",
        color: "inherit",
        "background-color": "inherit",
        "text-align": "center",
        cursor: "pointer",
        "white-space": "nowrap",
    }
});

export type HorzontalAlignment = "left" | "center" | "right";

export interface Props {
    pageCount: number;
    pageIndex: number;
    pageRangeDisplayed: number;
    marginPagesDisplayed: number;
    onPageChange: (pageIndex: number) => void;
    activeClassName?: string;   // extra class name that is added to active <li/>
    horizontalAlignment?: HorzontalAlignment;
}

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export default (props: ReactProps<Props>) => {
    const {pageCount, pageIndex, pageRangeDisplayed, marginPagesDisplayed, onPageChange, activeClassName, horizontalAlignment} = props;
    const classes = useStyles({horizontalAlignment});
    const content = (pageCount < 2
        ? null :
        <div className={classes.paginateOuterContainer}>
            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={pageRangeDisplayed}
                marginPagesDisplayed={marginPagesDisplayed}
                forcePage={pageIndex}
                previousLabel="«"
                nextLabel="»"
                containerClassName={classes.paginateContainer}
                breakClassName={classes.paginate_li}
                pageClassName={classes.paginate_li}
                previousClassName={classes.paginate_li}
                nextClassName={classes.paginate_li}
                activeClassName={`${classes.paginate_li} ${activeClassName}`}
                breakLinkClassName={classes.paginate_link}
                pageLinkClassName={classes.paginate_link}
                activeLinkClassName={classes.paginate_link}
                previousLinkClassName={classes.paginate_link}
                nextLinkClassName={classes.paginate_link}
                disabledClassName={classes.paginate_li_disabled}
                onPageChange={({selected}) => {onPageChange(selected)}}
            />
        </div>
        )
    return content;
}