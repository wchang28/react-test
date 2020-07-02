import * as React from 'react';
import {useState} from "react";
import {NameEntry, Name} from "./name-entry";
import {Dialog, FieldErrors, prompt as prompModal} from "./setup-dialog";
import {FontSize, TestingPane, ConfigurationPane, getButton, getFontSizeSelector, getLabel, getColorSelector, Color} from './test-common';

export default () => {
	const [name, setName] = useState<Name>({firstName: "Wen", lastName: "Chang"});
	const [dialogVisible, setDialogVisible] = useState(false);
	const [fontSize, setFontSize] = useState<FontSize>("small");
	const [color, setColor] = useState<Color>("black");
	const [modal, setModal] = useState<JSX.Element>(null);
	const contentClassName = `w3-${fontSize}`;
	const maxWidthPx = 400;
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
		const name = await prompModal<Name>(setModal, NameEntry, "Edit Your Name (Promise)", null, maxWidthPx, contentClassName, color, verifyData);
		if (name) {
			setName(name);
		}
	}
	const dialog = (dialogVisible ? (
		<Dialog
			contentComponentClass={NameEntry}
			data={name}
			verifyData={verifyData}
			captions="Edit Your Name"
			titleBarColor={color}
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
					{getColorSelector(color, setColor)}
					{getButton("Edit name", onEditName)}
					{getButton("Test Modal Promise", onTestModalPromise)}
					{dialog}
					{modal}
				</ConfigurationPane>
			</div>
		</TestingPane>
	);
}