import * as React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, match, withRouter} from "react-router-dom";

const people: {id: string, name: string}[] = [
    {id: "0", name: "Michelle"}
    ,{id: "1", name: "Sean"}
    ,{id: "2", name: "Kim"}
    ,{id: "3", name: "David"}
];

interface PersonProps {
    match: match<{id: string}>;
}

class PersonImpl extends React.Component<PersonProps, any> {
    constructor(props) {
        console.log("Person:ctor()");
        super(props);
        this.state = {
        };
    }
    static getDerivedStateFromProps(nextProps: PersonProps, prevState: any) {
        console.log(`Person:getDerivedStateFromProps()`);
        return null
    }
    find(id: string) {
        for (const person of people) {
            if (person.id == id) {
                return person;
            }
        }
        return null;
    }
    render() {
        const match = this.props.match;
        console.log(`Person: match=\n${JSON.stringify(match, null, 2)}`);
        const id = match.params.id;
        const person = this.find(id);
        return (
            <div className="w3-border">
                <p>
                    Welcome to {person.name}'s Home Page
                </p>
            </div>
        );
    }
}

const Person = withRouter(PersonImpl);

interface PeopleProps {
    match: match<{}>;
}

interface PeopleState {
    triggerFrom?: "ctor" | "linkClicked" | "backClicked"
    hideList?: boolean;
}

class PeopleImpl extends React.Component<PeopleProps, PeopleState> {
    constructor(props) {
        console.log("People:ctor()");
        super(props);
        this.state = {
            triggerFrom: "ctor"
            ,hideList: false
        };
    }
    static getDerivedStateFromProps(nextProps: PersonProps, prevState: PeopleState) {
        console.log(`People:getDerivedStateFromProps(), prevState=${JSON.stringify(prevState)}`);
        if (prevState.triggerFrom === "ctor") {
            return {triggerFrom: null};
        } else if (prevState.triggerFrom === "linkClicked") {
            return {triggerFrom: null};
        } else if (prevState.triggerFrom === "backClicked") {
            return {triggerFrom: null};
        } else if (prevState.triggerFrom === null) {
            return {hideList: false};
        } else {
            return null;
        }
    }
    get OnPersonLinkClickHandler() {
        return (() => {
            console.log("A person's link is clicked");
            this.setState({triggerFrom: "linkClicked", hideList: true});
        }).bind(this);
    }
    get OnBackButtonClickHandler() {
        return (() => {
            console.log("Back button is clicked");
            this.setState({triggerFrom: "backClicked", hideList: false});
        }).bind(this);
    }
    render() {
        const match = this.props.match;
        console.log(`People: match=\n${JSON.stringify(match, null, 2)}`);
        const listDisplay = (this.state.hideList ? "none" : "block");
        const contentDisplay = (this.state.hideList ? "block" : "none");
        const links = people.map(({id, name}, index) => {
            return (
                <li key={index}>
                    <Link to={`${match.url}/${id}`} onClick={this.OnPersonLinkClickHandler}>
                        {name}
                    </Link>
                </li>
            );
        });
        return (
            <div>
                <Router>
                    <div style={{display: listDisplay}}>
                        <ul className="w3-ul w3-border">
                            {links}
                        </ul>
                    </div>
                    <div style={{display: contentDisplay}}>
                        <div className="w3-bar">
                            <Link to={`${match.path}`} className="w3-bar-item w3-button w3-border w3-round" onClick={this.OnBackButtonClickHandler}>Back</Link>
                        </div>
                        <div>
                            <Switch>
                                <Route path={`${match.path}/:id`}>
                                    <Person/>                                
                                </Route>
                                <Route path={`${match.path}`}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

const People = withRouter(PeopleImpl);

export class Test extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div>
                <div className="w3-container w3-border" style={{marginTop: "8px", marginBottom: "8px"}}>
                    <h5>Back Button Routing Test</h5>
                    <Router>
                        <div>
                            <Link to="/people">List of People</Link>
                        </div>
                        <div>
                            <Switch>
                                <Route path="/people">
                                    <People/>                                
                                </Route>
                                <Route path="/">
                                    <div>
                                        <p>Click the link "List of People" to start testing</p>
                                    </div>
                                </Route>
                            </Switch>
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}