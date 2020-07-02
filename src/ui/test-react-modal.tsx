import React, {useState} from "react";
import Modal from 'react-modal';
import {FontSize, getFontSizeSelector, TestingPane, ConfigurationPane, FontSizeColorTestingWrapper, getButton, getCheckbox} from "./test-common";

function useModalPromise(setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>)
: [() => Promise<boolean>, () => void, () => void] {
    const [hasResolve, setHasResolve] = useState<{resolve: (canceled: boolean) => void}>({resolve: null});
    const doModal = () => {
        return new Promise<boolean>((resolve) => {
            setModalIsOpen(true);
            setHasResolve({resolve});
        });
    };
    const getModalOnCloseHandler = (canceled: boolean) => {
        return () => {
            setModalIsOpen(false);
            if (hasResolve.resolve) {
                hasResolve.resolve(canceled);
                setHasResolve({resolve: null});
            }
        };
    };
    return [doModal, getModalOnCloseHandler(true), getModalOnCloseHandler(false)];
}

export default () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [fontSize, setFontSize] = useState<FontSize>("small");
    const [good, setGood] = useState<boolean>(true);
    const [doModal, onModalCanceled, onModalOK] = useModalPromise(setModalIsOpen);
    const onTest = async () => {
        const canceled = await doModal();
        if (canceled) {
            alert(`canceled`);
        } else {
            alert(`Done. good=${good? "true" : "false"}`);
        }
    };
    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          padding               : '0px'
        }
      };
    return (
        <div>
            <TestingPane>
                <div style={{width: "250px"}}>
                    <ConfigurationPane>
                        {getFontSizeSelector(fontSize, setFontSize)}
                        {getButton("Show Modal", onTest)}
                        <div>good: {good ? "true" : "false"}</div>
                    </ConfigurationPane>
                </div>
            </TestingPane>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={onModalCanceled}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div style={{width: "250px"}}>
                    <FontSizeColorTestingWrapper fontSize={fontSize}>
                        <ConfigurationPane>
                            {getCheckbox("Good", good, setGood)}
                            {getButton("Close Modal", onModalOK)}
                        </ConfigurationPane>
                    </FontSizeColorTestingWrapper>
                </div>
            </Modal>
        </div>
    );
};