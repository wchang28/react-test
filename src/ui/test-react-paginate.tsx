import React, {useState} from "react";
import ReactPaginate from 'react-paginate';
import {
    TestingPane
    ,ConfigurationPane
    ,getHorizontalAlignmentSelector
    ,HorzontalAlignment
    ,getW3CSSHorizontalAlignmentClass
    ,getNumberInput
    ,Color
    ,allColors
    ,getOptionSelector
    ,FontSize
    ,getFontSizeSelector
    ,FontSizeColorTestingWrapper
} from "./test-common";
import {injectCSS} from "./utils";

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

export default () => {
    const [pageCount, setPageCount] = useState(100);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);
    const [marginPagesDisplayed, setMarginPagesDisplayed] = useState(2);
    const [fontSize, setFontSize] = useState<FontSize>("medium");
    const [horizontalAlignment, setHorizontalAlignment] = useState<HorzontalAlignment>("left");
    const [pageSelectedColor, setPageSelectedColor] = useState<Color>("green");
    const w3AlignmentClass = getW3CSSHorizontalAlignmentClass(horizontalAlignment);
    return (
        <TestingPane>
            <ConfigurationPane>
                {getNumberInput("Page Count", pageCount, setPageCount)}
                {getNumberInput("Current Page Index", pageIndex, setPageIndex)}
                {getNumberInput("Page Range Displayed", pageRangeDisplayed, setPageRangeDisplayed)}
                {getNumberInput("Margin Pages Displayed", marginPagesDisplayed, setMarginPagesDisplayed)}
                {getHorizontalAlignmentSelector(horizontalAlignment, setHorizontalAlignment)}
                {getOptionSelector(allColors, "Page Selected Color:", pageSelectedColor, setPageSelectedColor)}
                {getFontSizeSelector(fontSize, setFontSize)}
            </ConfigurationPane>
            <FontSizeColorTestingWrapper fontSize={fontSize}>
                <div className={w3AlignmentClass}>
                    <ReactPaginate
                        pageCount={pageCount}
                        pageRangeDisplayed={pageRangeDisplayed}
                        marginPagesDisplayed={marginPagesDisplayed}
                        forcePage={pageIndex}
                        previousLabel="<"
                        nextLabel=">"
                        containerClassName={ROOT_CLASS_NAME}
                        activeClassName={`selected w3-${pageSelectedColor}`}
                        onPageChange={({selected}) => {setPageIndex(selected)}}
                    />
                </div>
            </FontSizeColorTestingWrapper>)
        </TestingPane>
    );
}