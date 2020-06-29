import React, {useState} from "react";
import {
    TestingPane
    ,ConfigurationPane
    ,getHorizontalAlignmentSelector
    ,HorzontalAlignment
    ,getNumberInput
    ,Color
    ,allColors
    ,getOptionSelector
    ,FontSize
    ,getFontSizeSelector
    ,FontSizeColorTestingWrapper
} from "./test-common";
import Paginate from "./paginate";

export default () => {
    const [pageCount, setPageCount] = useState(100);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);
    const [marginPagesDisplayed, setMarginPagesDisplayed] = useState(2);
    const [fontSize, setFontSize] = useState<FontSize>("small");
    const [horizontalAlignment, setHorizontalAlignment] = useState<HorzontalAlignment>("left");
    const [pageSelectedColor, setPageSelectedColor] = useState<Color>("green");
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
                <div className="w3-container" style={{marginTop: "8px"}}>
                    <Paginate
                        pageCount={pageCount}
                        pageRangeDisplayed={pageRangeDisplayed}
                        marginPagesDisplayed={marginPagesDisplayed}
                        pageIndex={pageIndex}
                        activeClassName={`selected w3-${pageSelectedColor}`}
                        onPageChange={setPageIndex}
                        horizontalAlignment={horizontalAlignment}
                    />
                </div>
            </FontSizeColorTestingWrapper>)
        </TestingPane>
    );
}