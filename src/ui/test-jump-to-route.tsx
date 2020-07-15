import React, {useState} from "react";
import {TestingPane, ConfigurationPane, getTextInput} from "./test-common";
import {Link, Redirect} from "react-router-dom";
import {simulateDoingSomeWork} from "./utils";
import {indicateBusyWork} from "./jquery-utils";

export default () => {
    const [routeUrl, setRouteUrl] = useState("/nesting-routing/topics/props-v-state");
    const [jumpViaRedirect, setJumpViaRedirect] = useState(false);
    const onJumpViaRedirectClick = async () => {
        await indicateBusyWork(simulateDoingSomeWork());
        setJumpViaRedirect(true);
    };
    const onJumpProgramaticallyClick = async () => {
        await indicateBusyWork(simulateDoingSomeWork());
        window.location.href = routeUrl;
    };
    const redirect = (jumpViaRedirect ? <Redirect push={true} to={routeUrl}/> : null);
    return (
        <TestingPane configWidth="250px">
            <ConfigurationPane>
                {getTextInput("Route to Jump to:", routeUrl, setRouteUrl)}
            </ConfigurationPane>
            <div className="w3-small">
                {redirect}
                <p>
                    <Link to={routeUrl}>{"Jump using react-router-dom's <Link> tag"}</Link>
                </p>
                <p>
                    <button className="w3-button w3-border w3-round w3-light-grey" onClick={onJumpViaRedirectClick}>{"Jump programatically via react-router-dom's <Redirect> tag (if need to do some work before jump)"}</button>
                </p>
                <p>
                    <a href={routeUrl}>{"Jump using <a> tag (causes server traffic)"}</a>
                </p>
                <p>
                    <button className="w3-button w3-border w3-round w3-light-grey" onClick={onJumpProgramaticallyClick}>Jump programatically by setting window.location.href (causes server traffic)</button>
                </p>
            </div>
        </TestingPane>
    )
}