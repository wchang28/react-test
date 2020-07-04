import * as React from 'react';
import {useState} from "react";
import {NameEntry, Name} from "./name-entry";
import {Dialog, FieldErrors, prompt as prompModal} from "./setup-dialog";
import PrompeEdit from "./prompt-edit";
import {FontSize, TestingPane, ConfigurationPane, getNumberInput, getButton, getFontSizeSelector, getLabel, getColorSelector, Color, getCheckbox} from './test-common';

export default () => {
	const [name, setName] = useState<Name>({firstName: "Wen", lastName: "Chang"});
	const [dialogVisible, setDialogVisible] = useState(false);
	const [fontSize, setFontSize] = useState<FontSize>("small");
	const [titleBarColor, setTitleBarColor] = useState<Color>("blue");
	const [maxWidthPx, setMaxWidthPx] = useState(400);
	const [modal, setModal] = useState<JSX.Element>(null);
	const [inputValue, setInputValue] = useState("");
	const [testLongMessage, setTestLongMessage] = useState(false);
	const [promptModal, setPromptModal] = useState<JSX.Element>(null);
	const contentClassName = `w3-${fontSize}`;
	const verifyData = async (data: Name) => {
		const ret: FieldErrors = {};
		if (!data || !data.firstName) {
			ret["firstName"] = "Frist name cannot be blank"
		}
		if (!data || !data.lastName) {
			ret["lastName"] = "Last name cannot be blank"
		}
		return ret;
	};
	const onEditName = () => {
		setDialogVisible(true);
	};
	const onDialogClose = (data: Name, hint?: any) => {
		setDialogVisible(false);
		if (data) {
			setName(data);
		}
	};
	const onTestModalPromise = async () => {
		const name = await prompModal<Name>(setModal, NameEntry, "Edit Your Name (Promise)", null, maxWidthPx, contentClassName, titleBarColor, verifyData);
		if (name) {
			setName(name);
		}
	};
	const onTestPrompt = async () => {
		const message = (testLongMessage ?
		 `This article is light grey and the text is brown. This article is light grey and the text is brown. This article is light grey and the text is brown. This article is light grey and the text is brown.\nThis article is light grey and the text is brown`
		:"This is a test");
		const value = await prompModal<string>(setPromptModal, PrompeEdit, "Testing prompt()", inputValue, maxWidthPx, contentClassName, titleBarColor, null, {message});
		console.log(`value=${value}`);
		if (value) {
			setInputValue(value);
		}
	};
	const dialog = (dialogVisible ? (
		<Dialog
			contentComponentClass={NameEntry}
			data={name}
			verifyData={verifyData}
			captions="Edit Your Name"
			titleBarColor={titleBarColor}
			hint={null}
			onClose={onDialogClose}
			contentProps={{textColor: "green"}}
			maxWidthPx={maxWidthPx}
			contentClassName={contentClassName}
		/>
	) : null);
	return (
		<TestingPane>
			<div style={{width: "250px"}}>
				<ConfigurationPane>
					{getLabel(`Hi ${name.firstName} ${name.lastName}`)}
					{getFontSizeSelector(fontSize, setFontSize)}
					{getColorSelector(titleBarColor, setTitleBarColor)}
					{getNumberInput("Max Width (px)", maxWidthPx, setMaxWidthPx)}
					{getButton("Edit name", onEditName)}
					{getButton("Test Modal Promise", onTestModalPromise)}
					{getLabel(`inputValue=${inputValue}`)}
					{getCheckbox("Test Long Message", testLongMessage, setTestLongMessage)}
					{getButton("Test Prompt", onTestPrompt)}
					{dialog}
					{modal}
					{promptModal}
				</ConfigurationPane>
			</div>
		</TestingPane>
	);
}