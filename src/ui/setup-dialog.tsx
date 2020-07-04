import * as React from 'react';

export type FieldErrors = {[field: string]: string};
export type ContentComponentConstructor = any;
// edit content must implement the following props
export interface ContentProps<T> {
    value: T;
    onChange?: (value: T) => void;
    fieldErrors?: FieldErrors;
    onFieldErrorsChange?: (fieldErrors: FieldErrors) => void;
}

const deepCopy = (src: any) => (JSON.parse(JSON.stringify(src)));

export interface Props {
    contentComponentClass: ContentComponentConstructor;
    data: any;
    verifyData: (date: any, hint?: any) => Promise<FieldErrors>
    captions?: string;
    titleBarColor?: string;
    hint?: any;
    onClose: (data?: any, hint?: any) => void;
    contentProps?: any;
    maxWidthPx?: number;
    contentClassName?: string;
}

const DEFAULT_WIDTH_PX = 600;
const DEFAULT_TITLEBAR_COLOR = "blue";

interface State {
    data?: any;
    fieldErrors?: FieldErrors;
}

export class Dialog extends React.Component<Props, State> {
    private _documentKeyUpListner: (event: KeyboardEvent) => void
    private get DocumentKeyUpListner() {
        return ((event: KeyboardEvent) => {
            if (event.key === "Enter") {
                this.onOK();
            } else if (event.key === "Escape") {
                this.onClose();
            }
        }).bind(this);
    }
    constructor(props) {
        super(props);
        this._documentKeyUpListner = this.DocumentKeyUpListner;
        this.state = {
            data: deepCopy(this.props.data)
            ,fieldErrors: {}
        };
    }
    private clearErrors() {
        this.setState({fieldErrors: {}});
    }
    private onClose() {
        this.clearErrors();
        this.props.onClose(null, this.props.hint);
    }

    private async onOK() {
        const data = this.state.data;
        const fieldErrors = await this.props.verifyData(data, this.props.hint);
        if (fieldErrors && JSON.stringify(fieldErrors) !== '{}') {
            this.setState({fieldErrors});
        } else {
            this.clearErrors();
            this.props.onClose(data, this.props.hint);
        }
    }

    private onDataChanged(data: any) {
        this.setState({data: deepCopy(data)});
    }

    private onFieldErrorsChanged(fieldErrors: FieldErrors) {
        this.setState({fieldErrors: deepCopy(fieldErrors)});
    }

    render() {
        const caption = (this.props.captions || "");
        const titleBarColor = (this.props.titleBarColor || DEFAULT_TITLEBAR_COLOR);
        const titleBarClassName = `w3-container w3-${titleBarColor}`;
        const titleBarStyle: React.CSSProperties = {paddingTop: "0.5em", paddingBottom: "0.5em", fontWeight: "bold"};
        const crossButtonStyle: React.CSSProperties = {padding: "0.3em 0.8em", fontWeight: "bold"};
        const maxWidthPx = (this.props.maxWidthPx || DEFAULT_WIDTH_PX);
        const ContentComponentClass = this.props.contentComponentClass;
        const contentProperties = Object.assign({
            value: this.state.data
            ,fieldErrors: this.state.fieldErrors
            ,onChange: this.onDataChanged.bind(this)
            ,onFieldErrorsChange: this.onFieldErrorsChanged.bind(this)
        }, (this.props.contentProps ? this.props.contentProps : {})
        );
        const contentElement = React.createElement(ContentComponentClass, contentProperties);
        const buttonBarStyle: React.CSSProperties = {paddingTop: "0.8em", paddingBottom: "0.8em"};
        const buttonClass = "w3-btn w3-border w3-round";
        const buttonStyle: React.CSSProperties = {padding: "0.3em 0.8em"};
        return (
            <div className="w3-modal" style={{display: "block"}}>
                <div className={`w3-modal-content${this.props.contentClassName ? ` ${this.props.contentClassName}`: ""}`} style={{maxWidth:`${maxWidthPx}px`}}>
                    <header className={titleBarClassName} style={titleBarStyle}> 
                        <span onClick={() => this.onClose()} className="w3-button w3-display-topright" style={crossButtonStyle}>x</span>
                        {caption}
                    </header>
                    <div className="w3-container">
                        {contentElement}
                        <div className="w3-bar" style={buttonBarStyle}>
                            <div className="w3-right">
                                <button className={buttonClass} style={buttonStyle} onClick={() => this.onOK()}>OK</button>
                                {' '}
                                <button className={buttonClass} style={buttonStyle} onClick={() => this.onClose()}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        //console.log(`Dialog.componentDidMount`);
        document.addEventListener("keyup", this._documentKeyUpListner);
    }
    componentWillUnmount() {
        //console.log(`Dialog.componentWillUnmount`);
        document.removeEventListener("keyup", this._documentKeyUpListner);
    }
}

export function prompt<VT = any>(
	setModalDisplay: React.Dispatch<React.SetStateAction<JSX.Element>>
	,contentComponentClass: any
	,captions?: string
	,defaultData?: VT
	,maxWidthPx?: number
	,titleBarColor?: string
	,verifyData?: (data: VT) => Promise<FieldErrors>
    ,contentProps?: any
    ,contentClassName?: string
) {
	return new Promise<VT>((resolve) => {
		const dialog = <Dialog
			contentComponentClass={contentComponentClass}
			data={defaultData}
			verifyData={(verifyData ? verifyData : async (data: VT) => {return null;})}
			captions={captions}
			titleBarColor={titleBarColor}
			onClose={(data: VT) => {
				setModalDisplay(null);
				resolve(data ? data: null);
			}}
			contentProps={contentProps}
			maxWidthPx={maxWidthPx}
			contentClassName={contentClassName}
		/>
		setModalDisplay(dialog);
	});
}