import React, {useState} from "react";
import {TestingPane, ConfigurationPane, getFontSizeSelector, FontSize, FontSizeColorTestingWrapper} from "./test-common";
import Autosuggest, {InputProps, SuggestionsFetchRequestedParams} from 'react-autosuggest';
import {injectCSS, uuid} from "./utils";

const this_class = `test-react-autosuggest-${uuid()}`;

const AUTO_SUGGEST_WIDTH = "500px";

injectCSS(`
.${this_class} .react-autosuggest__container {
    width: 100%;
    position: relative;
}

.${this_class} .react-autosuggest__input {
    width: 100%;
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
    width: 100%;
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
        <TestingPane testingClassName={this_class}>
            <ConfigurationPane>
                {getFontSizeSelector(fontSize, setFontSize)}
            </ConfigurationPane>
            <FontSizeColorTestingWrapper fontSize={fontSize}>
                <div className="w3-container" style={{height: "2000px", width: AUTO_SUGGEST_WIDTH}}>
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
                    />
                    <div style={{marginTop: "8px"}}>
                        <table className="w3-table-all">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Jill</td>
                                    <td>Smith</td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <td>Eve</td>
                                    <td>Jackson</td>
                                    <td>94</td>
                                </tr>
                                <tr>
                                    <td>Adam</td>
                                    <td>Johnson</td>
                                    <td>67</td>
                                </tr>
                                <tr>
                                    <td>Bo</td>
                                    <td>Nilson</td>
                                    <td>35</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </FontSizeColorTestingWrapper>
        </TestingPane>
    );
};