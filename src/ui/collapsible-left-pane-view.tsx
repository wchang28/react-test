import * as React from "react";
import {ReactNode} from "react";
import {createUseStyles} from 'react-jss';

/*
<!DOCTYPE html>
<html>
<title>W3.CSS</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
	.clear-float::before {content:"";display:table;clear:both;}
    .clear-float::after {content:"";display:table;clear:both;}
</style>
<body>

<div class="clear-float" style="width:100%;display:table;">
  <div class="w3-red clear-float" style="display:table-cell;width:200px">
  
    <div class="w3-blue clear-float" style="width:100%;position:relative;height:1.5em;overflow:hidden;">
      <div class="w3-white" style="width:1.5em;height:1.5em;position:absolute;right:0;">
        <i class="fa fa-arrow-circle-o-right" style="font-size:1.25em;margin:0;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);cursor:pointer;"></i>
      </div>
    </div>

  	<div class="w3-container">
    	L<br/>
    	L<br/>
    </div>
    
  </div>
  <div class="w3-green clear-float" style="display:table-cell;">
  	<div class="w3-container">
    	R<br/>
    	R<br/>
    	R<br/>
    	R<br/>
    </div>
  </div>
</div>

<div class="clear-float w3-padding w3-grey">
	Collapse
</div>

<div class="clear-float" style="width:100%;display:table;">
  <div class="w3-red clear-float" style="display:table-cell;width:1.5em;">
  
    <div class="w3-blue clear-float" style="width:100%;position:relative;height:1.5em;overflow:hidden;">
      <div class="w3-white" style="width:1.5em;height:1.5em;position:absolute;right:0;">
        <i class="fa fa-arrow-circle-o-right" style="font-size:1.25em;margin:0;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);cursor:pointer;"></i>
      </div>
    </div>

  </div>
  <div class="w3-green clear-float" style="display:table-cell;">
  	<div class="w3-container">
    	R<br/>
    	R<br/>
    	R<br/>
    	R<br/>
    </div>
  </div>
</div>

</body>
</html>
*/

const TOGGLE_AREA_DIMENSION = "1.5em";

const cf = {content: '""', display: "table", clear: "both"};
const clearFloat = {"&:before": cf, "&:after": cf};

const useStyles = createUseStyles({
    mainContainer: {
        ...clearFloat,
        display: "table"
        ,width: "100%"
    },
    leftContainer: {
        ...clearFloat,
        display: "table-cell",
        width: ({collapsed, leftPaneWidth}) => (collapsed ? TOGGLE_AREA_DIMENSION : leftPaneWidth)
    },
    rightContainer: {
        ...clearFloat,
        display: "table-cell"
    },
    toggleBar: {
        ...clearFloat,
        width: "100%",
        position: "relative",
        overflow: "hidden",
        height: TOGGLE_AREA_DIMENSION
    },
    toggleArea: {
        height: TOGGLE_AREA_DIMENSION,
        width: TOGGLE_AREA_DIMENSION,
        position: "absolute",
        right: "0"
    },
    toggleButton: {
        "font-size": "1.25em",
        margin: "0",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform:"translate(-50%, -50%)",
        cursor:"pointer"
    }
});

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

export interface Props {
    collapsed?: boolean;
    leftPaneWidth?: string;
    collapseButtonTitle?: (collapsed: boolean) => string;
    onCollapseChanged: (collapsed: boolean) => void;
}

export default function CollapsibleLeftPaneView(props: ReactProps<Props>) {
    const {children, collapsed, leftPaneWidth, collapseButtonTitle, onCollapseChanged} = props;
    const leftPaneContent = children[0];
    const rightPaneContent = children[1];
    const classes = useStyles({collapsed, leftPaneWidth});
    const toggleButton = <i className={`fa fa-${collapsed ? "arrow-circle-o-right" : "arrow-circle-o-left"} ${classes.toggleButton}`} title={collapseButtonTitle(collapsed)} onClick={() => {onCollapseChanged(!collapsed);}}></i>;
    const toggleBar = <div className={classes.toggleBar}><div className={classes.toggleArea}>{toggleButton}</div></div>;
    return (
        <div className={classes.mainContainer}>
            <div className={classes.leftContainer}>
                {toggleBar}
                {collapsed ? null : leftPaneContent}
            </div>
            <div className={classes.rightContainer}>
                {rightPaneContent}
            </div>
        </div>
    );
}

CollapsibleLeftPaneView.defaultProps = {
    collapsed: false
    ,leftPaneWidth: "300px"
    ,collapseButtonTitle: (collapsed: boolean) => (collapsed ? "Expand to the right" : "Collapse to the left")
    ,onCollapseChanged: () => {}
} as Props;