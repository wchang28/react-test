import * as React from "react";
import {ReactNode} from "react";
import ReactPaginate from 'react-paginate';
import * as uglifycss from "uglify-css";

function injectCSS(css: string, uglify: boolean = false) {
    const style = document.createElement('style');
    style.setAttribute("type", "text/css");
    if (uglify) {
        css = uglifycss.processString(css);
    }
    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName("head")[0].appendChild(style); 
}

export function getW3CSSHorizontalAlignmentClass(horizontalAlignment?: HorzontalAlignment) {
    switch(horizontalAlignment) {
        case "center":
            return "w3-center";
        case "right":
            return "w3-right-align";
        case "left":
        default:
            return "w3-left-align";
    }
}

const ROOT_CLASS_NAME = "react-paginate-ul";

injectCSS(`
.${ROOT_CLASS_NAME} {
    width:auto;
    display:inline-block;
    list-style-type:none;
    padding:0;
    margin:0;
    border:1px solid #ccc!important;
}
.${ROOT_CLASS_NAME} li {
    padding:0;
    float:left;
    width:auto;
    border-right:1px solid #ddd;
    display:block;
    outline:0;
}
.${ROOT_CLASS_NAME} li:last-child {
    border-right:none;
}
.${ROOT_CLASS_NAME} a {
    outline:0;
    padding:0.53em 1.06em;
    border:none;
    display:inline-block;
    vertical-align:middle;
    overflow:hidden;
    text-decoration:none;
    color:inherit;
    background-color:inherit;
    text-align:center;
    cursor:pointer;
    white-space:nowrap;
}
.${ROOT_CLASS_NAME} a:hover {
    color:#000!important;
    background-color:#ccc!important;
}
`);

export type HorzontalAlignment = "left" | "center" | "right";

export interface Props {
    pageCount: number;
    pageIndex: number;
    pageRangeDisplayed: number;
    marginPagesDisplayed: number;
    onPageChange: (pageIndex: number) => void;
    activeClassName?: string;
    horizontalAlignment?: HorzontalAlignment;
}

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export default (props: ReactProps<Props>) => {
    const {pageCount, pageIndex, pageRangeDisplayed, marginPagesDisplayed, onPageChange, activeClassName, horizontalAlignment} = props;
    return (
        <div className={getW3CSSHorizontalAlignmentClass(horizontalAlignment)}>
            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={pageRangeDisplayed}
                marginPagesDisplayed={marginPagesDisplayed}
                forcePage={pageIndex}
                previousLabel="<"
                nextLabel=">"
                containerClassName={ROOT_CLASS_NAME}
                activeClassName={activeClassName}
                onPageChange={({selected}) => {onPageChange(selected)}}
            />
        </div>
    );
}