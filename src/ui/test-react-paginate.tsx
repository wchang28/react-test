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

injectCSS(`
.paginate-ul {
    width:auto;
    display:inline-block;
}
.paginate-li {
    padding:0!important;
    float:left;
    width:auto;
    border:none;
    display:block;
    outline:0;
}
.paginate-a {
    outline:0!important;
    padding:0.53em 1.06em!important;
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
                        containerClassName="paginate-ul w3-ul w3-border w3-light-grey"
                        pageClassName="paginate-li w3-border-right"
                        activeClassName={`selected w3-${pageSelectedColor}`}
                        breakClassName="paginate-li break w3-border-right"
                        previousClassName="paginate-li previous w3-border-right"
                        nextClassName="paginate-li next"
                        pageLinkClassName="paginate-a w3-button"
                        activeLinkClassName="selected"
                        breakLinkClassName="paginate-a w3-button break"
                        previousLinkClassName="paginate-a w3-button previous"
                        nextLinkClassName="paginate-a w3-button next"
                        onPageChange={({selected}) => {setPageIndex(selected)}}
                    />
                </div>
            </FontSizeColorTestingWrapper>)
        </TestingPane>
    );
}