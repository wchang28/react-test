import * as React from 'react';

export type FieldErrors = {[field: string]: string};
export type ContentComponentConstructor = new (props: any) => any;

const deepCopy = (src: any) => (JSON.parse(JSON.stringify(src)));

interface DialogProps {
    contentComponentConstructor: ContentComponentConstructor;
    data: any;
    verifyData: (date: any) => Promise<FieldErrors>
    captions?: string;
    hint?: any;
    onClose: (data?: any, hint?: any) => void;
}

interface DialogState {
    data?: any;
    fieldErrors?: FieldErrors;
}

export class Dialog extends React.Component<DialogProps, DialogState> {
    private _documentEscapeKeyListner: (event: KeyboardEvent) => void
    private get DocumentEscapeKeyListner() {
        return ((event: KeyboardEvent) => {
            if (event.key === "Escape") {
                this.onClose();
            }
        }).bind(this);
    }
    constructor(props) {
        super(props);
        this._documentEscapeKeyListner = this.DocumentEscapeKeyListner;
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
        this.setState({data: deepCopy(data)})
    }

    private onFieldErrorsChanged(fieldErrors: FieldErrors) {
        this.setState({fieldErrors: deepCopy(fieldErrors)})
    }

    render() {
        const caption = (this.props.captions ? this.props.captions : "");
        const ContentComponent = this.props.contentComponentConstructor;
        return (
            <div className="w3-modal" style={{display: "block"}}>
                <div className="w3-modal-content" style={{maxWidth:"600px"}}>
                    <header className="w3-container w3-blue"> 
                        <span onClick={() => this.onClose()} className="w3-button w3-display-topright">x</span>
                        <h6>{caption}</h6>
                    </header>
                    <div className="w3-container">
                        <ContentComponent value={this.state.data} fieldErrors={this.state.fieldErrors} onChange={this.onDataChanged.bind(this)} onFieldErrorsChange={this.onFieldErrorsChanged.bind(this)} />
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
        document.addEventListener("keyup", this._documentEscapeKeyListner);
    }
    componentWillUnmount() {
        //console.log(`Dialog.componentWillUnmount`);
        document.removeEventListener("keyup", this._documentEscapeKeyListner);
    }
}
