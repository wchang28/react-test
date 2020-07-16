import React, {useState} from "react";
import {TestingPane, ConfigurationPane, getFontSizeSelector, FontSize, FontSizeColorTestingWrapper, getNumberInput, getCheckbox, getTestTable} from "./test-common";
import Autosuggest, {InputProps, SuggestionsFetchRequestedParams} from 'react-autosuggest';
import {createUseStyles} from 'react-jss';

const styles = {
    container: {
        width: ({width}) => width,
        position: "relative",
    },
    input: {
        width: "100%",
        padding: "0.5em",
        border: "1px solid #ccc",
        "border-radius": ({borderRadius}) => borderRadius
    },
    inputFocused: {
        outline: "none"
    },
    inputOpen: {
        "border-bottom-left-radius": ({}) => 0,
        "border-bottom-right-radius": ({}) => 0        
    },
    suggestionsContainer: {
        display: "none"
    },
    suggestionsContainerOpen: {
        display: "block",
        position: "absolute",
        width: ({width}) => width,
        "border-left": "1px solid #ccc",
        "border-right": "1px solid #ccc",
        "border-bottom": "1px solid #ccc",
        "border-bottom-left-radius": ({borderRadius}) => borderRadius,
        "border-bottom-right-radius": ({borderRadius}) => borderRadius,
        "z-index": 2
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        "list-style-type": "none"
    },
    suggestion: {
        cursor: "pointer",
        padding: "0.5em"
    },
    suggestionHighlighted: {
        "background-color": "#ddd"
    }
};

const useStyles = createUseStyles(styles);

interface SuggestItem {
    name: string;
    year: number;
};

const languages: SuggestItem[] = [
    {
        name: 'C',
        year: 1972
    },
    {
        name: 'C#',
        year: 2000
    },
    {
        name: 'C++',
        year: 1983
    },
    {
        name: 'Clojure',
        year: 2007
    },
    {
        name: 'Elm',
        year: 2012
    },
    {
        name: 'Go',
        year: 2009
    },
    {
        name: 'Haskell',
        year: 1990
    },
    {
        name: 'Java',
        year: 1995
    },
    {
        name: 'Javascript',
        year: 1995
    },
    {
        name: 'Perl',
        year: 1987
    },
    {
        name: 'PHP',
        year: 1995
    },
    {
        name: 'Python',
        year: 1991
    },
    {
        name: 'Ruby',
        year: 1995
    },
    {
        name: 'Scala',
        year: 2003
    }
];

const fetchSuggestions = async (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : languages.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

export default () => {
    const [fontSize, setFontSize] = useState<FontSize>("small");
    const [widthPx, setWidthPx] = useState(400);
    const [borderRadiusPx, setBorderRadiusPx] = useState(4);
    const [hasContentBelow, setHasContentBelow] = useState(false);
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState<SuggestItem[]>([]);
    const classes = useStyles({width: `${widthPx}px`, borderRadius: `${borderRadiusPx}px`});
    const renderSuggestion = (suggestion: SuggestItem) => (
        <div>
            {suggestion.name}
        </div>
    );
    const onSuggestionsFetchRequested = async (request: SuggestionsFetchRequestedParams) => {
        setSuggestions(await fetchSuggestions(request.value));
    };
    // Autosuggest will pass through all these props to the input.
    const inputProps: InputProps<SuggestItem> = {
        placeholder: "🔍", // or "\u{1f50d}"
        value,
        onChange: (event, {newValue, method}) => {
            //console.log(`onChange(): method=${method}, newValue=${newValue}`);
            setValue(newValue);
        }
        ,type: "search"
        ,onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.keyCode === 13) {
                event.preventDefault();
                console.log(`onKeyUp(keyCode === {enter})`);
            }
        }
    };
    const autoSuggest =
    <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={() => {setSuggestions([]);}}
        getSuggestionValue={(suggestion: SuggestItem) => (suggestion.name)}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={(event, {suggestion, method}) => {
            console.log(`onSuggestionSelected(): method=${method}, suggestion=${JSON.stringify(suggestion)}`);
        }}
        inputProps={inputProps}
        theme={classes}
    />;
    const contentBelow = (hasContentBelow ? <div style={{marginTop: "8px"}}>{getTestTable()}</div> : null);
    return (
        <TestingPane>
            <ConfigurationPane>
                {getFontSizeSelector(fontSize, setFontSize)}
                {getNumberInput("Width (px)", widthPx, setWidthPx)}
                {getNumberInput("Border Radius (px)", borderRadiusPx, setBorderRadiusPx)}
                {getCheckbox("Has Content Below", hasContentBelow, setHasContentBelow)}
            </ConfigurationPane>
            <FontSizeColorTestingWrapper fontSize={fontSize} color="light-grey">
                <div style={{padding: "0.01em 16px"}}>
                    {autoSuggest}
                    {contentBelow}
                </div>
            </FontSizeColorTestingWrapper>
        </TestingPane>
    );
};