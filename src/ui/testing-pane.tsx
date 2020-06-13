import React, {ReactNode} from "react";

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export default (props: ReactProps) => {
    const cofigurationPane = props.children[0];
    const displayPane = props.children[1];
    return (
        <div>
        <div className="w3-container w3-border" style={{padding: "0 8px", marginTop: "8px"}}>
            {cofigurationPane}
        </div>
        <div className="w3-container w3-border" style={{paddingTop: "8px", paddingBottom: "8px", marginTop: "8px"}}>
            {displayPane}
        </div>
    </div>
    )
}