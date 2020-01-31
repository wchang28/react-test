import * as React from 'react';

export type FieldErrors = {[field: string]: string};
export type ContentComponentConstructor = new (props: any) => any;

const deepCopy = (src: any) => (JSON.parse(JSON.stringify(src)));

interface DialogProps {
    contentComponentClass: ContentComponentConstructor;
    data: any;
    verifyData: (date: any) => Promise<FieldErrors>
    captions?: string;
    titleBarColor?: string;
    hint?: any;
    onClose: (data?: any, hint?: any) => void;
    contentProps?: any;
    maxWidthPx?: number;
}

interface DialogState {
    data?: any;
    fieldErrors?: FieldErrors;
}

export class Dialog extends React.Component<DialogProps, DialogState> {
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
        const fieldErrors = await this.props.verifyData(data);
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
        const caption = (this.props.captions ? this.props.captions : "");
        const titleBarColor = (this.props.titleBarColor ? this.props.titleBarColor : "blue");
        const titleBarClassName = `w3-container w3-${titleBarColor}`;
        const maxWidthPx = (this.props.maxWidthPx ? this.props.maxWidthPx : 600);
        const ContentComponentClass = this.props.contentComponentClass;
        const contentProperties = Object.assign({
            value: this.state.data
            ,fieldErrors: this.state.fieldErrors
            ,onChange: this.onDataChanged.bind(this)
            ,onFieldErrorsChange: this.onFieldErrorsChanged.bind(this)
        }, (this.props.contentProps ? this.props.contentProps : {})
        );
        const contentElement = React.createElement(ContentComponentClass, contentProperties);
        return (
            <div className="w3-modal" style={{display: "block"}}>
                <div className="w3-modal-content" style={{maxWidth:`${maxWidthPx}px`}}>
                    <header className={titleBarClassName}> 
                        <span onClick={() => this.onClose()} className="w3-button w3-display-topright">x</span>
                        <h6>{caption}</h6>
                    </header>
                    <div className="w3-container">
                        {contentElement}
                        <div className="w3-bar w3-padding-16">
                            <div className="w3-right">
                                <button className="w3-btn w3-white w3-border w3-border-blue w3-round" onClick={() => this.onOK()}>OK</button>
                                {' '}
                                <button className="w3-btn w3-white w3-border w3-border-blue w3-round" onClick={() => this.onClose()}>Cancel</button>
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
