import React, {useState} from "react";
import {TestingPane, ConfigurationPane, getFontSizeSelector, FontSize, FontSizeColorTestingWrapper, getNumberInput, getTestTable} from "./test-common";
import Autosuggest, {InputProps, SuggestionsFetchRequestedParams} from 'react-autosuggest';
import {createUseStyles} from 'react-jss';

const styles = {
    container: {
        width: ({widthPx}) => `${widthPx}px`,
        position: "relative"
    },
    input: {
        width: "100%",
        padding: "0.5em",
        border: "1px solid #aaa",
        "border-radius": "4px"        
    },
    inputFocused: {
        outline: "none"
    },
    inputOpen: {
        "border-bottom-left-radius": 0,
        "border-bottom-right-radius": 0        
    },
    suggestionsContainer: {
        display: "none"
    },
    suggestionsContainerOpen: {
        display: "block",
        position: "absolute",
        width: ({widthPx}) => `${widthPx}px`,
        "border-left": "1px solid #aaa",
        "border-right": "1px solid #aaa",
        "border-bottom": "1px solid #aaa",
        "background-color": "#fff",
        "border-bottom-left-radius": "4px",
        "border-bottom-right-radius": "4px",
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
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState<SuggestItem[]>([]);
    const classes = useStyles({widthPx});
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
    return (
        <TestingPane>
            <ConfigurationPane>
                {getFontSizeSelector(fontSize, setFontSize)}
                {getNumberInput("Width (px)", widthPx, setWidthPx)}
            </ConfigurationPane>
            <FontSizeColorTestingWrapper fontSize={fontSize}>
                <div className="w3-container" style={{height: "2000px"}}>
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
                    />
                    <div style={{marginTop: "8px"}}>
                        {getTestTable()}
                    </div>
                </div>
            </FontSizeColorTestingWrapper>
        </TestingPane>
    );
};