import * as React from 'react';
import {useState} from "react";
import {NameEntry, Name} from "./name-entry";
import {Dialog, FieldErrors} from "./setup-dialog";
import {FontSize, TestingPane, ConfigurationPane, getButton, getFontSizeSelector, getLabel, getColorSelector, Color} from './test-common';

export default () => {
	const [name, setName] = useState<Name>({firstName: "Wen", lastName: "Chang"});
	const [dialogVisible, setDialogVisible] = useState(false);
	const [fontSize, setFontSize] = useState<FontSize>("small");
	const [color, setColor] = useState<Color>("black");
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
	const onEditNameClick = () => {
		setDialogVisible(true);
	};
	const onDialogClose = (data: Name, hint?: any) => {
		setDialogVisible(false);
		if (data) {
			setName(data);
		}
	};
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
			maxWidthPx={400}
			contentClassName={`w3-${fontSize}`}
		/>
	) : null);
	return (
		<TestingPane>
			<div style={{width: "250px"}}>
				<ConfigurationPane>
					{getLabel(`Hi ${name.firstName} ${name.lastName}`)}
					{getFontSizeSelector(fontSize, setFontSize)}
					{getColorSelector(color, setColor)}
					{getButton("Edit name", onEditNameClick)}
					{dialog}
				</ConfigurationPane>
			</div>
		</TestingPane>
	);
}