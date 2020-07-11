import React, {useState} from "react";
import {TestingPane, ConfigurationPane, getFontSizeSelector, FontSize, FontSizeColorTestingWrapper} from "./test-common";
import Autosuggest, {InputProps, SuggestionsFetchRequestedParams} from 'react-autosuggest';
import {injectCSS, uuid} from "./utils";

const this_class = `test-react-autosuggest-${uuid()}`;

injectCSS(`
.${this_class} .react-autosuggest__container {
    position: relative;
}

.${this_class} .react-autosuggest__input {
    width: 240px;
    padding: 0.5em;
    border: 1px solid #aaa;
    border-radius: 4px;
}

.${this_class} .react-autosuggest__input--focused {
    outline: none;
}

.${this_class} .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

.${this_class} .react-autosuggest__suggestions-container {
    display: none;
}

.${this_class} .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 2.52em;
    width: 240px;
    border: 1px solid #aaa;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
}

.${this_class} .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

.${this_class} .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 0.5em;
}
  
.${this_class} .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
}
`);

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
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState<SuggestItem[]>([]);
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
        placeholder: 'Type a programming language',
        value,
        onChange: (event, ce) => {setValue(ce.newValue)}
    };
    return (
        <TestingPane testingClassName={this_class}>
            <ConfigurationPane>
                {getFontSizeSelector(fontSize, setFontSize)}
            </ConfigurationPane>
            <FontSizeColorTestingWrapper fontSize={fontSize}>
                <div className="w3-container" style={{height: "600px"}}>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={() => {setSuggestions([]);}}
                        getSuggestionValue={(suggestion: SuggestItem) => (suggestion.name)}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
                </div>
            </FontSizeColorTestingWrapper>
        </TestingPane>
    );
};